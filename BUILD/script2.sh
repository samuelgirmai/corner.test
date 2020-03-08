#!/bin/bash
source ./include.sh

MACHINE_FE="rufta@cornerhealth.io"

BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

deploy()
{
  printf "\n\x1b[32mdeploying images...\n\x1b[0m"

  scp ./images/corner.fe.tar.gz $MACHINE_FE:/home/rufta/

  ssh $MACHINE_FE docker load -i /home/rufta/corner.fe.tar.gz

  printf "\n\x1b[32mimages deployed to machines\n\x1b[0m"
}

mkvol()
{
  printf "\n\x1b[32mcreating volumes...\n\x1b[0m"

  ssh $MACHINE_FE docker volume create corner.fe

  printf "\n\x1b[32mvolumes created\n\x1b[0m"
}

mrproper()
{
  printf "\n\x1b[32mcleaning everything...\n\x1b[0m"

  ssh $MACHINE_FE docker container kill corner.fe
  ssh $MACHINE_FE docker container rm corner.fe
  ssh $MACHINE_FE docker volume rm corner.fe
  ssh $MACHINE_FE docker image rm bokri/corner.fe:latest

  #rm -r -f ./images/*
  #rm -f Dockerfile

  printf "\n\x1b[32mremoved everything\n\x1b[0m"
}

_stop()
{
  printf "\n\x1b[32mstopping container(s)...\n\x1b[0m"

  ssh $MACHINE_FE docker container kill corner.fe
  ssh $MACHINE_FE docker container rm corner.fe

  printf "\n\x1b[32mstopped container(s)\n\x1b[0m"
}

_restart()
{
  _stop
  run
}

run()
{
  printf "\n\x1b[32mrunning corner on machines...\n\x1b[0m"

  ssh $MACHINE_FE docker run --name corner.fe --hostname host.fe -v corner.fe:/corner.fe -p 4000-4020:3000-3020 -p 80:80 -d --restart unless-stopped bokri/corner.fe:latest

  printf "\n\x1b[32mrun\n\x1b[0m"
}

if [ "$1" = "configure" ]; then
  configure
elif [ "$1" = "compile" ]; then
  compile $2 $3
elif [ "$1" = "build" ]; then
  build
elif [ "$1" = "deploy" ]; then
  deploy
elif [ "$1" = "mkvol" ]; then
  mkvol
elif [ "$1" = "run" ]; then
  run
elif [ "$1" = "stop" ]; then
  _stop
elif [ "$1" = "restart" ]; then
  _restart
elif [ "$1" = "mrproper" ]; then
  mrproper
else
  printf "\n\x1b[31m$>script [configure|compile|build|deploy|mkvol|run|stop|restart|mrproper]\n\n\x1b[0m"
  exit
fi

