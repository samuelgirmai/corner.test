#!/bin/bash
MACHINE_FE="machine.asset"
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

source ./compile/auth.sh
source ./compile/mru.sh

compile()
{
  auth_compile
  mru_compile
}

build()
{
  printf "\n\x1b[32mbuiding images...\n\x1b[0m"

  cp dockerfiles/Dockerfile.all Dockerfile

  tar -czf ./images/corner.tar.gz -C ./builds/. . --exclude-vcs --exclude --exclude

  docker build -t bokri/corner.fe:latest .

  docker save bokri/corner.fe:latest | gzip > ./images/corner.fe.tar.gz

  printf "\n\x1b[32mimages built\n\x1b[0m"
}

deploy()
{
  printf "\n\x1b[32mdeploying images...\n\x1b[0m"

  docker-machine scp ./images/corner.fe.tar.gz $MACHINE_FE:/home/docker/

  docker-machine ssh $MACHINE_FE docker load -i /home/docker/corner.fe.tar.gz

  printf "\n\x1b[32mimages deployed to machines\n\x1b[0m"
}

volume()
{
  printf "\n\x1b[32mcreating volumes...\n\x1b[0m"

  docker-machine ssh $MACHINE_FE docker volume create corner.fe

  printf "\n\x1b[32mvolumes created\n\x1b[0m"
}

mrproper()
{
  printf "\n\x1b[32mcleaning everything...\n\x1b[0m"

  docker-machine ssh $MACHINE_FE docker container kill corner.fe
  docker-machine ssh $MACHINE_FE docker container rm corner.fe

  docker-machine ssh $MACHINE_FE docker volume rm corner.fe

  docker-machine ssh $MACHINE_FE docker image rm bokri/corner.fe:latest

  rm ./images/*
  rm Dockerfile

  printf "\n\x1b[32mremoved everything\n\x1b[0m"
}

_stop()
{
  printf "\n\x1b[32mstopping container(s)...\n\x1b[0m"

  docker-machine ssh $MACHINE_FE docker container kill corner.fe
  docker-machine ssh $MACHINE_FE docker container rm corner.fe

  printf "\n\x1b[32mstopped container(s)\n\x1b[0m"
}

run()
{
  printf "\n\x1b[32mrunning corner on machines...\n\x1b[0m"

  docker-machine ssh $MACHINE_FE docker run --name corner.fe --hostname host.fe -v corner.fe:/corner.fe -p 3010:3000 -p 3011:3001 -d --restart unless-stopped bokri/corner.fe:latest

  printf "\n\x1b[32mrun\n\x1b[0m"
}

if [ "$1" = "compile" ]; then
  compile
elif [ "$1" = "build" ]; then
  build
elif [ "$1" = "deploy" ]; then
  deploy
elif [ "$1" = "volume" ]; then
  volume
elif [ "$1" = "run" ]; then
  run
elif [ "$1" = "stop" ]; then
  _stop
elif [ "$1" = "mrproper" ]; then
  mrproper
else
  printf "\n\x1b[31m$>$0 [build|deploy|volume|run|stop|mrproper]\n\n\x1b[0m"
  exit
fi

