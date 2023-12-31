.PHONY: clean build security-check lint test coverage

NODE_VERSION_SUPPORTED := >=20.8.0
NODE_VERSION=$(shell node -v)

clean:
	rm -rf ./lib ./coverage

build:
	$(info Node version supported: $(NODE_VERSION_SUPPORTED))
	$(info Node version installed: $(NODE_VERSION))
	npm ci --silent
	npm run build

security-check:
	npm audit

lint:
	npm run lint

test:
	npm run test

coverage:
	npm run coverage