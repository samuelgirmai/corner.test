#!/bin/bash
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/products/corner/tools/BUILD/fe"
APPS_DIR="/home/samuel/current_tasks/personal/bokri/products/corner/frontend"

auth_compile()
{
  printf "\n\x1b[32mbuiding auth fe...\n\x1b[0m"

  AUTH_PATH="$APPS_DIR/auth.ui"

  #change directory for a build
  cd $AUTH_PATH

  if [ ! -d "$AUTH_PATH/node_modules" ]; then
    npm install
  fi

  NODE_PATH=src npm run build

  if [ -d "$BUILD_DIR/builds/public/auth" ]; then
    rm -r $BUILD_DIR/builds/public/auth
  fi

  mv build $BUILD_DIR/builds/public/auth

  printf "\n\x1b[32mbuilt auth fe...\n\x1b[0m"
}

