# Executables (local)
DOCKER = docker
DOCKER_COMPOSE = docker compose

# Docker containers
ANGULAR_CONTAINER = $(DOCKER_COMPOSE) exec frontend

NPM = $(DOCKER_COMPOSE) run frontend npm

# Misc
.DEFAULT_GOAL = help
.PHONY        = help build up start down logs sh composer vendor
MAKEFLAGS     += --no-print-directory

# Environment
ENV ?= dev

## —— 🎵 🐳 The Makefile 🐳 🎵 —————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

setup: build start logs

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml build

up: ## Start the docker hub in detached mode (no logs)
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml up --detach

up-frontend:
	@$(DOCKER_COMPOSE) up frontend --build --force-recreate --detach

up-frontend-dev:
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml up frontend --build --force-recreate --detach

up-rebuild: ## Start; --force rebuild
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml up --build --force-recreate --detach

start: up install ## Start the docker hub in detached mode (no logs)

install: install-frontend ## Install project

install-frontend:
	#$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml exec frontend ## npm ci

down: ## Stop the docker hub
	@$(DOCKER_COMPOSE) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml logs --follow

ps: ## Show the running containers
	@$(DOCKER_COMPOSE) ps

ps-dev: ## Show the running containers
	@$(DOCKER_COMPOSE) -f ./docker-compose-dev.yaml ps

angular-login: ## Connect to the frontend container with bash
	@$(ANGULAR_CONTAINER) sh

test-%: ENV=ci

test:
	$(ANGULAR_CONTAINER) ng test

## —— Codestyle 🔍  ————————————————————————————————————————————————————————————————


## —— Docker compose push 📦  ————————————————————————————————————————————————————————————————
docker-push:
	$(DOCKER) push larsvandersangen/recipelist

docker-push-frontend:
	$(DOCKER) push larsvandersangen/recipelist

prepare-env:
	sed -i 's/\[firebaseApiKey\]/$(FIREBASE_API_KEY)/g' ./src/environments/environment.ts

## —— Kubernetes  🐙  ————————————————————————————————————————————————————————————————
k8s-deploy-prod:
	kubectl apply -f ./k8s/recipelist-prod -n $(K8S_NAMESPACE)
	# Enforce restart for the pods
	kubectl rollout restart -f ./k8s/recipelist-prod/recipelist-deployment.yaml -n $(K8S_NAMESPACE)
	kubectl apply -f ./k8s/ingress-prod -n $(K8S_NAMESPACE)
	kubectl apply -f ./k8s/certmanager-prod -n $(K8S_NAMESPACE)
