#!/bin/bash
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

rufta_admin_compile()
{
  printf "\n\x1b[32mbuiding rufta/admin fe...\n\x1b[0m"

  EMR_ADMIN_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/admin"
  #change directory for a build
  cd $EMR_ADMIN_PATH

  if [ ! -d "$EMR_ADMIN_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/admin" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/admin
  fi

  mv build $BUILD_DIR/builds/public/rufta/admin

  printf "\n\x1b[32mbuilt rufta/admin fe...\n\x1b[0m"
}

rufta_mru_compile()
{
  printf "\n\x1b[32mbuiding rufta/mru fe...\n\x1b[0m"

  MRU_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/mru"
  #change directory for a build
  cd $MRU_PATH

  if [ ! -d "$MRU_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/mru" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/mru
  fi

  mv build $BUILD_DIR/builds/public/rufta/mru

  printf "\n\x1b[32mbuilt rufta/mru fe...\n\x1b[0m"
}

rufta_compile()
{
  mkdir -p $BUILD_DIR/builds/public/rufta

  rufta_admin_compile
  rufta_mru_compile
}


