#!/bin/bash
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/products/corner/tools/BUILD"

launcher_compile()
{
  printf "\n\x1b[32mbuiding launcher fe...\n\x1b[0m"

  LAUNCHER_PATH="/home/samuel/current_tasks/personal/bokri/products/corner/frontend/launcher"

  #change directory for a build
  cd $LAUNCHER_PATH

  if [ ! -d "$LAUNCHER_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/launcher" ]; then
    rm -r $BUILD_DIR/builds/public/launcher
  fi

  mv dist $BUILD_DIR/builds/public/launcher

  printf "\n\x1b[32mbuilt launcher fe...\n\x1b[0m"
}

