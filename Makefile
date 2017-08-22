.DEFAULT_GOAL := help
.PHONY: help test refresh-dependencies

help:
	@echo "Sets up global config files"
	@echo ""
	@echo "Targets:"
	@echo "refresh-dependencies     npm dependency refresh"
	@echo "test                     run test suite"

test: npm-dependencies
	npm test

dependency-upgrade: npm-dependencies
	npm upgrade

npm-dependencies:
	npm install
