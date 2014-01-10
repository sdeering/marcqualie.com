---
layout: post
title: "Server Backups with s3cmd"
date: 2013-07-28 20:04:32
tags:
 - Linux
 - Digital Ocean
 - Backup
 - AWS
 - S3
 - Servers
---
I've been asked a few times how I back up my servers at [Digital Ocean](https://www.digitalocean.com/?refcode=4f6e23440060). It seems this topic is quite popular due to the fact they just started charging for automated backups on the 1st of July. In this article I'm going to go through the process of using [s3cmd](s3tools.org/s3cmd) with [Amazon S3](https://aws.amazon.com/s3/) to easily backup and restore your servers. Although I use Digital Ocean as my own hosting company, and this is where this backup system is in place, it can just as easily be transferred to any hosting provider.

First of all, you're going to want to install s3cmd which is part of s3tools. This is a simple command line utility that takes away all of the complexity around transferring files to S3. All of these instructions below are going to be targeted at an Ubuntu based operating system. The only thing that mainly differs is the installation of the s3cmd tool. Once it's installed, all commands are the same. Run the following code to install the utility.

{% highlight bash %}
wget -O- -q http://s3tools.org/repo/deb-all/stable/s3tools.key | sudo apt-key add -
wget -O/etc/apt/sources.list.d/s3tools.list http://s3tools.org/repo/deb-all/stable/s3tools.list
apt-get update
apt-get install -y  s3cmd
{% endhighlight %}

You will need a bucket to store you data in S3. If you don't already have an account you will need to create one. Visit the [AWS Console](https://console.aws.amazon.com/s3/home?region=us-east-1) and create a new bucket. This name must be unique to you. Selecting a location is permanent and cannot be changed after creation to it's best to pick a location close to your server will reduce transfer times.

Now that the tool is installed and a bucket is setup, you will want to configure it with your AWS credentials. I recommend using Amazon AMI, but that is out of the scope of this tutorial. You will require valid AWS security credentials with permission to read and modify contents of S3 buckets. Run the following command and follow the instructions.

{% highlight bash %}
s3cmd --configure
{% endhighlight %}

Once everything is configured and the test checks have passed you will want to create a backup script to actually send your data to S3. There are many different ways of doing this and you might even have your own scripts to use. In general I try to grab all of my data into once place then sync that directory. Below I'm going to show you a couple of basic scripts to backup your web directory and MySQL. The following code should go in ```~/backup/mysql```.

{% highlight python %}
#!/usr/bin/env python
import os
import time
username = 'backup'
password = 'password'
hostname = 'localhost'
filestamp = time.strftime('%Y%m%d')
database_list_command = "mysql -u%s -p%s -h%s --silent -N -e 'show databases'" % (username, password, hostname)
for database in os.popen(database_list_command).readlines():
    database = database.strip()
    if database == 'information_schema' or database == 'performance_schema' or database == 'mysql':
        continue
    filename = "/backup/mysql/%s-%s.sql" % (database, filestamp)
    print "Backing up %s" % filename
    os.popen("mysqldump -u%s -p%s -h%s -e --opt -c %s | gzip -c -9 > %s.gz" % (username, password, hostname, database, filename))
    print ".. done"
{% endhighlight %}

All that does is grab a list of all your databases, dump them, then gzip then into a the ```/backup/mysql``` directory. I recommend using a /backup directory and splitting it into categories such as "www" and "mysql". This makes syncing back to S3 very easy, which make more sense in the final section.

Now that all of your MySQL data is backed up and compressed locally, we want to do the same for your source code and web applications. I'm going to assume that your web applications are installed at ```/var/www```. You may or may not have multiple websites hosted here, this tutorial will work regardless as you're going to be backing up the entire directory. The following script will compress that entire directory into one tar.gz file which saves on space and allows point-in-time backups. You should put the following code in ```~/backup/www```.

{% highlight bash %}
#!/bin/sh
tar -czvf /backup/www/`date +%Y%m%d`.tar.gz /var/www
{% endhighlight %}

This will store the entire directory in one tar.gz file which will be your single day snapshot. Now that you have your mysql and www data in /backup it's time to write the s3cmd part of the system. Put the following code into ```~/backup/s3```.

{% highlight bash %}
#!/bin/sh
s3cmd sync /backup/ s3://yourbucket/`hostname`/
{% endhighlight %}

You should replace ```yourbucket``` with the bucket you created earlier. You will notice I inserted hostname in there; This is incase you want to backup multiple machines to the same bucket for easier management. I currently do this for clients so they're all in one place with one set of credentials so it's easy to manage and everything is in one central place with organisation.

All parts of the backup system are now in place, you simply need to make them run automatically. Before we can do this you will need to run the 3 following commands to get your system ready. Nothing advanced, they simple create the directories where the backups will be stored.

{% highlight bash %}
chmod +x ~/backup/*
mkdir -p /backup/mysql
mkdir -p /backup/www
{% endhighlight %}

Putting all of the parts together is quite simple. Create a script at ```~/backup/run``` with the following content.

{% highlight bash %}
#!/bin/sh
~/backup/mysql
~/backup/www
~/backup/s3
{% endhighlight %}

That script now allows us to setup a daily cron to automatically backup mysql, then your web directory, then sync everything back to Amazon S3. To do that will will want to run ```crontab -e``` and insert the following code.

{% highlight bash %}
MAILTO=cron@yourserver.com
0 0 * * * user /home/user/backup/run
{% endhighlight %}

You should replace ```user``` with the username that should run the backups (also where the user where you stored the backup scripts in ~). Once that is done everything is now ready and your system has fully automated backups to Amazon S3! You can give it a quick test by running:

{% highlight bash %}
~/backup/run
{% endhighlight %}

You should see the output in your console and the files appear in your s3 bucket. Any errors that happens along the way should be printed out to the console for you to debug, and if they were to happen during execution they will also be emailed to your as part of the cron mailer.

To restore content you can simple download the tar.gz files from Amazon S3 onto the server, or a new server, extract them and move them to the correct place. In case of MySQL you simply run the mysql importer on the extracted .sql files to get your system back to the point the backup was created. My next article will be on advanced restoration topics and how to build a fresh server automatically from a backup in S3. Please comment if you have any feedback or questions.

All of the code for the above scripts can be found at the following [Gist](https://gist.github.com/marcqualie/6099324).
