---
title: Model Errors in EmberJS
layout: post
tags:
- EmberJS
- JavaScript
- Rails
---
Today, I spent longer than I feel comfortable admitting solving a suposedly simple problem in my EmberJS application. Since this particular issue was so frustrating and undocumented I'm going to share my experiences in-case someone else comes across the same hair-pulling nightmare in the future.

### Back Story

The application in question is a private dashboard system which allows clients to create and manage their own business profiles. It's getting close to launch so I decided it was time to spice up the UI with some nice error messages that are helpful to the user. The idea was to highlight the fields that have errors and display a message underneath explaning why there was an error. In Rails (or any other framework) this would be very easy or even built right into the form helper in some cases. In EmberJS? Seemingly straightforward, but it turned into an afternoon of rabbit holes and head-banging against my desk.

### Ember Models

Ember, or rather [Ember Data](http://emberjs.com/api/data/) has error helpers built right into the models. Actually figuring out how to use those helpers is another story all together. I wasn't able to find any tutorials and the API documentation wasn't clear on what to use. There was also no indication as to what formatting errors should be in. The Rails app I was developing against output data in the following format.

{% highlight json %}
{
  "attribute_1": ["error message 1", "error message 2"],
  "attribute_2": ["error_message 2"]
}
{% endhighlight %}

I'm not overly fond of the layout, but it seems fairly standard in rails applications. Checking my models for errors was bringing back absolutely nothing so it was time to do some digging around the source code. An assumption lead me to search the [Rest Adapter](https://github.com/emberjs/data/blob/bce78d5d5b28fd468b7b4f8346cf51f0326cf54f/packages/ember-data/lib/adapters/rest_adapter.js#L524) file since that's where all the Ajax requests are handled.

{% highlight javascript %}
App.ApplicationAdapter = DS.RESTAdapter.extend({
  ajaxError: function(jqXHR) {
    var error = this._super(jqXHR);
    if (jqXHR && jqXHR.status === 422) {
      var jsonErrors = Ember.$.parseJSON(jqXHR.responseText)["errors"];
      return new DS.InvalidError(jsonErrors);
    } else {
      return error;
    }
  }
});
{% endhighlight %}

Sure enough, from the code above you can see that anything in the ```errors``` attribute is returned as a DS.InvalidError. Unfortunately, this code is not part of the adapter by default. It's actually commented out and put there as suggested functionality if you need it. After patching that code into my adapter I then had to update the API output. Luckily this version of the API has never been released to the public yet and our applications that currently use it internally are in private Beta and heavily tested. I added a helper to my Rails application controller which is easily tested and keeps the output consistent.

{% highlight ruby %}
class ApplicationController < ActionController::Base
  def respond_with_errors(errors, status)
    respond_with { errors: errors }, status: (status || 500)
  end
end
{% endhighlight %}

A very simple snippet of code. All it does it make sure the errors field is set. This allows us to change it to any other field name in the future to update all errors output in one go. It also defaults to a 500 http status code unless one is passed through. To use the code is very straight forward.

{% highlight ruby %}
class SomeController < ApplicationController
  def update
    if @model.save
      respond_with @model
    else
      respond_with_errors @model.errors, 422
    end
  end
end
{% endhighlight %}

### Almost Working

Okay, so now I've figured out the issue and patched the adapter. The API is outputting the correct formatting now so everything should just work as expected. Wrong. You didn't think Ember would be that kind, did you? Here is the below pseudo code that I expected to work after these changes.

{% highlight html %}
{% raw %}
<div {{bind-attr class=":form-group errors.name:has-error"}}>
  {{input value=name}}
  {#if errors.name}}
    {{#each errors.name}}
      <span class="label label-error">{{error}}</span>
    {{/each}}
  {{/if}}
</div>
{% endraw %}
{% endhighlight %}

The actual code is a lot more complex, but this demonstrates that I was essentially iterating over each of the errors on the ```name``` field and displaying it inside a label tag. The actual output in the application was ```[Object object]```. The experienced JavaScript developers reading this will recognise this as an object being incorrectly type-casted to a string. I was quite confused because the API had been updated to the format that EmberJS requires to this didn't make any sense.

### Digging Deeper

I started inspecting the Ajax response objects in the chrome console and the output was as I expected. The ```DS.InvalidError``` object that I was returning was in the following format.

{% highlight json %}
{
  "name": ["can't be blank", "must be unique"]
}
{% endhighlight %}

This is exactly what I expected. I even triple checked my ```each``` block and it didn't make sense why "can't be blank" was coming out as "[Object object]". I went digging around the source code some more and turns out the DS.InvalidError object is not actually used, and instead is used to create a ```DS.Error``` object which then gets attached to ```Model.errors```. The ```DS.Error``` object is in the following format.

{% highlight json %}
{
  "name": [
    { "attribute": "name", "message": "can't be blank" },
    { "attribute": "name", "message": "must be unique" }
  ]
}
{% endhighlight %}

I'm not 100% sure of the design choice behind that object formatting. All I can assume is that each error block is global and assigned to the fields when needed which is why they have the attribute attached. Once I figured this out the fix was quite simple.

{% highlight html %}
{% raw %}
{{#if errors.name}}
  {{#each errors.name}}
    <label class="label label-error">{{error.message}}</label>
  {{/each}}
{{/if}}
{% endraw %}
{% endhighlight %}

### Grey Hairs Ahoy!

Finally everything was working as expected. This was originally a quick form to add a new Business profile which should have taken no more than 10-20 minutes of my time. I ended up taking closer to 2 hours which pushed back some other features from getting launched. On the upside, if I ever need to use these kind of model error validations again on other projects I will be able to write them instantly without any worries.

I think I covered all the major points but feel free to comment if you're having the same issue and this doesn't solve it. Also, if you managed to solve this another way without cutting years off your life I'd love to hear about it.
