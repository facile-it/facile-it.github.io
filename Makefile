.PHONY: serve build deploy submodule-update help

## serve            : serve local development blog environment
serve:
	bin/hugo server -D

## build            : build blog into public directory
build:
	rm -rf public
	bin/hugo

## deploy           : deploy blog to master
deploy:
	bin/deploy

## submodule-update : update submodule theme
submodule-update:
	git submodule update

## help             : print this help
help: Makefile
	@sed -n 's/^##//p' $<
