#!/bin/bash

source ./compile/_main.sh
source ./configure/_main.sh

configure()
{
  configure_all $1
}

compile()
{
  compile_all $1 $2
}

build()
{
  #incase compile modules didn't return back to build path
  cd $BUILD_DIR

  printf "\n\x1b[32mcompressing...\n\x1b[0m"

  tar -czf ./images/corner.tar.gz -C ./builds/. . --exclude-vcs --exclude --exclude

  printf "\n\x1b[32mcompressed (corner.tar.gz)\n\x1b[0m"

  printf "\n\x1b[32mbuiding images...\n\x1b[0m"

  cp dockerfiles/Dockerfile.all Dockerfile

  docker build -t bokri/corner.fe:latest .
  docker save bokri/corner.fe:latest | gzip > ./images/corner.fe.tar.gz

  printf "\n\x1b[32mimages built\n\x1b[0m"
}

