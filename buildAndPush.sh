#!/bin/bash
docker build --platform linux/amd64 -t open_analytics .
docker tag open_analytics registry.oswinjerome.in/open_analytics
docker push registry.oswinjerome.in/open_analytics