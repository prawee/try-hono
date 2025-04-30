#!/bin/bash
IMAGE_NAME="prawee/hono"
IMAGE_TAG="latest"

docker buildx create --name multi-builder --use || docker buildx use multi-builder

docker buildx build --platform linux/amd64,linux/arm64 -t $IMAGE_NAME:$IMAGE_TAG . --push