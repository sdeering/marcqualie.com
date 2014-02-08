default: configure build

configure:
	bundle install

build:
	bundle exec jekyll build -c _config.yml,_config.development.yml

watch:
	bundle exec jekyll build -c _config.yml,_config.development.yml --watch
