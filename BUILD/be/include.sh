BACKEND_PATH="/home/samuel/current_tasks/personal/bokri/products/corner/backend"

compile()
{
  printf "\n\x1b[32mcompressing...\n\x1b[0m"

  tar -czf ./images/corner.tar.gz -C $BACKEND_PATH/. . --exclude-vcs --exclude ./DESIGNS

  printf "\n\x1b[32mcompressed (corner.tar.gz)\n\x1b[0m"
}

build()
{
  printf "\n\x1b[32mbuiding images...\n\x1b[0m"

  if [ "$1" = "fs" ]; then
    if [ "$2" = "mongodb" ]; then
      printf "\n\x1b[32mbuilding with mongodb dockerfile\n\x1b[0m"
      cp dockerfiles/Dockerfile.fs.mongodb Dockerfile
    elif [ "$2" = "rethinkdb" ]; then
      printf "\n\x1b[32mbuilding with rethinkdb dockerfile\n\x1b[0m"
      cp dockerfiles/Dockerfile.fs.rethinkdb Dockerfile
    else
      printf "\n\x1b[31m$>build fs [mongodb|rethinkdb]\n\x1b[0m"
      exit
    fi

    docker build -t bokri/corner.fs:latest .
    docker save bokri/corner.fs:latest | gzip > ./images/corner.fs.tar.gz
  elif [ "$1" = "lg" ]; then
    cp dockerfiles/Dockerfile.lg Dockerfile
    docker build -t bokri/corner.lg:latest .
    docker save bokri/corner.lg:latest | gzip > ./images/corner.lg.tar.gz
  else
    printf "\n\x1b[31m$>build [fs|lg]\n\x1b[0m"
    exit
  fi

  printf "\n\x1b[32mimages built\n\x1b[0m"
}

