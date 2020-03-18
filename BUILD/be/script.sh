#!/bin/bash
source ./include.sh

MACHINE_FS="rufta@cornerhealth.io"
MACHINE_LG="rufta@cornerhealth.io"

dependency()
{
  if ! command -v tar >/dev/null 2>&1 ; then
    printf "\n\x1b[31mtar not found\n\x1b[0m"
    exit
  fi

  if ! command -v docker >/dev/null 2>&1 ; then
    printf "\n\x1b[31mdocker not found\n\x1b[0m"
    exit
  fi
}

deploy()
{
  printf "\n\x1b[32mdeploying images...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    scp ./images/corner.fs.tar.gz $MACHINE_FS:/home/rufta/
    ssh $MACHINE_FS docker load -i /home/rufta/corner.fs.tar.gz
  elif [ "$1" = "lg" ]; then
    scp ./images/corner.lg.tar.gz $MACHINE_LG:/home/rufta/
    ssh $MACHINE_LG docker load -i /home/rufta/corner.lg.tar.gz
  else
    printf "\n\x1b[31m$>deploy [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mimages deployed to machines\n\x1b[0m"
}

mkvol()
{
  printf "\n\x1b[32mcreating volumes...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    ssh $MACHINE_FS docker volume create corner.fs
    ssh $MACHINE_FS docker volume create corner.lg.fs
  elif [ "$1" = "lg" ]; then
    ssh $MACHINE_LG docker volume create corner.lg.lg
  else
    printf "\n\x1b[31m$>mkvol [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mvolumes created\n\x1b[0m"
}

rmvol()
{
  printf "\n\x1b[32mdeleting volumes...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    ssh $MACHINE_FS docker volume rm corner.fs corner.lg.fs
  elif [ "$1" = "lg" ]; then
    ssh $MACHINE_LG docker volume rm corner.lg.lg
  else
    printf "\n\x1b[31m$>rmvol [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mvolumes deleted\n\x1b[0m"
}

mknet()
{
  printf "\n\x1b[32mcreating network...\n\x1b[0m"

  ssh $MACHINE_FS docker network create corner.net
  
  ssh $MACHINE_FS docker network connect corner.net corner.fs
  ssh $MACHINE_FS docker network connect corner.net corner.lg

  printf "\n\x1b[32mnetwork created\n\x1b[0m"
}

rmnet()
{
  printf "\n\x1b[32mdeleting network...\n\x1b[0m"

  ssh $MACHINE_FS docker network disconnect corner.net corner.fs
  ssh $MACHINE_FS docker network disconnect corner.net corner.lg

  #ssh $MACHINE_FS docker network rm corner.net

  printf "\n\x1b[32mnetwork deleted\n\x1b[0m"
}

run()
{
  printf "\n\x1b[32mrunning corner on machines...\n\x1b[0m"
  if [ "$1" = "fs" ]; then
    ssh $MACHINE_FS docker run --name corner.fs --hostname host.fs -v corner.fs:/corner.fs -v corner.lg.fs:/corner.lg.fs -p 27017:27017 -p 28015:28015 -d --restart unless-stopped  bokri/corner.fs:latest
  elif [ "$1" = "lg" ]; then
    ssh $MACHINE_LG docker run --name corner.lg --hostname host.lg -v corner.lg.lg:/corner.lg.lg -p 21000:21000 -p 22000:22000 -p 22003:22003 -d --restart unless-stopped bokri/corner.lg:latest
  else
    printf "\n\x1b[31m$>run [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mcorner running; use controller to configure corner\n\x1b[0m"
}

_stop()
{
  printf "\n\x1b[32mstopping container(s)...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    ssh $MACHINE_FS docker container kill corner.fs
    ssh $MACHINE_FS docker container rm corner.fs
  elif [ "$1" = "lg" ]; then
    ssh $MACHINE_LG docker container kill corner.lg
    ssh $MACHINE_LG docker container rm corner.lg
  else
    printf "\n\x1b[31m$>stop [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mstopped container(s)\n\x1b[0m"
}

_restart()
{
  if [ "$1" = "fs" ]; then
    _stop "fs"
    run "fs"
  elif [ "$1" = "lg" ]; then
    _stop "lg"
    run "lg"
  else
    printf "\n\x1b[31m$>restart [fs|lg]\n\x1b[0m"
    exit
  fi
}

mrproper()
{
  printf "\n\x1b[32mcleaning everything...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    _stop "fs"
    rmvol "fs"
    ssh $MACHINE_FS docker image rm bokri/corner.fs:latest
    ssh $MACHINE_FS rm /home/rufta/corner.fs.tar.gz
  elif [ "$1" = "lg" ]; then
    _stop "lg"
    rmvol "lg"
    ssh $MACHINE_LG docker image rm bokri/corner.lg:latest
    ssh $MACHINE_LG rm /home/rufta/corner.lg.tar.gz
  else
    printf "\n\x1b[31m$>mrproper [fs|lg]\n\x1b[0m"
    exit
  fi

  rm -f ./images/*
  rm -f Dockerfile

  printf "\n\x1b[32mremoved everything\n\x1b[0m"
}

dependency

if [ "$1" = "compile" ]; then
  compile
elif [ "$1" = "build" ]; then
  build "$2" "$3"
elif [ "$1" = "deploy" ]; then
  deploy $2
elif [ "$1" = "mkvol" ]; then
  mkvol $2
elif [ "$1" = "rmvol" ]; then
  rmvol $2
elif [ "$1" = "mknet" ]; then
  mknet
elif [ "$1" = "rmnet" ]; then
  rmnet
elif [ "$1" = "run" ]; then
  run "$2"
elif [ "$1" = "stop" ]; then
  _stop $2
elif [ "$1" = "restart" ]; then
  _restart $2
elif [ "$1" = "mrproper" ]; then
  mrproper $2
else
  printf "\n\x1b[31m$>$0 [compile|build|deploy|mkvol|run|mknet|stop|restart|mrproper|rmvol|rmnet]\n\n\x1b[0m"
  exit
fi

