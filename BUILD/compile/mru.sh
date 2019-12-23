#!/bin/bash
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

mru_compile()
{
  printf "\n\x1b[32mbuiding mru fe...\n\x1b[0m"

  MRU_PATH="/home/samuel/current_tasks/personal/bokri/corner/emr/mru"
  #change directory for a build
  cd $MRU_PATH

  npm run build

  if [ -d "$BUILD_DIR/builds/public/mru" ]; then
    rm -r $BUILD_DIR/builds/public/mru
  fi

  mv build $BUILD_DIR/builds/public/mru

  #back to BUILD directory
  cd $BUILD_PATH

  printf "\n\x1b[32mbuilt mru fe...\n\x1b[0m"
}

