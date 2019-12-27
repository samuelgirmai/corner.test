#!/bin/bash
MACHINE_FE="machine.asset"
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

source ./compile/_main.sh

compile()
{
  compile_all
  #incase compile modules didn't return back to build path
  cd $BUILD_DIR

  printf "\n\x1b[32mcompressing...\n\x1b[0m"

  tar -czf ./images/corner.tar.gz -C ./builds/. . --exclude-vcs --exclude --exclude

  printf "\n\x1b[32mcompressed (corner.tar.gz)\n\x1b[0m"
}

mkpf()
{
  docker-machine stop $MACHINE_FE
  
  for P in {4000..4020}
  do
    vboxmanage modifyvm $MACHINE_FE --natpf1 "fe_$P,tcp,0.0.0.0,$P,,$P"
  done

  docker-machine start $MACHINE_FE
}

rmpf()
{
  docker-machine stop $MACHINE_FE

  for P in {4000..4020}
  do
    vboxmanage modifyvm $MACHINE_FE --natpf1 delete "fe_$P"
  done

  docker-machine start $MACHINE_FE
}

create_machine()
{
  printf "\n\x1b[32mcreating machine(s) ...\n\x1b[0m"

  docker-machine create --driver virtualbox $MACHINE_FE

  mkpf

  printf "\n\x1b[32mmachine(s) created...\n\x1b[0m"
}

build()
{
  printf "\n\x1b[32mbuiding images...\n\x1b[0m"

  cp dockerfiles/Dockerfile.all Dockerfile

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

mkvol()
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

  rm -f ./images/*
  rm -f Dockerfile

  printf "\n\x1b[32mremoved everything\n\x1b[0m"
}

_stop()
{
  printf "\n\x1b[32mstopping container(s)...\n\x1b[0m"

  docker-machine ssh $MACHINE_FE docker container kill corner.fe
  docker-machine ssh $MACHINE_FE docker container rm corner.fe

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

  docker-machine ssh $MACHINE_FE docker run --name corner.fe --hostname host.fe -v corner.fe:/corner.fe -p 4000-4020:3000-3020 -d --restart unless-stopped bokri/corner.fe:latest

  printf "\n\x1b[32mrun\n\x1b[0m"
}

if [ "$1" = "compile" ]; then
  compile
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
elif [ "$1" = "mkpf" ]; then
  mkpf
elif [ "$1" = "rmpf" ]; then
  rmpf
else
  printf "\n\x1b[31m$>$0 [build|deploy|mkvol|run|stop|restart|mkpf|rmpf|mrproper]\n\n\x1b[0m"
  exit
fi

