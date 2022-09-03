AWS_BASE_URL=637659487626.dkr.ecr.us-east-1.amazonaws.com
ECR_REPOSITORY?=caterpie
APP_URL=${AWS_BASE_URL}/${ECR_REPOSITORY}
IMAGE_TAG?=latest
ENVIRONMENT?=dev
NODE_ENV?=dev

all:
	make build && make push

push:
	docker push ${APP_URL}:${IMAGE_TAG}

build:
	docker build --file=./Dockerfile --build-arg node_env=${NODE_ENV} --build-arg environment=${ENVIRONMENT} -t ${APP_URL}:${IMAGE_TAG} .
