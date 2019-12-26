#!/bin/bash
BUILD_DIR="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD"

auth_compile()
{
  printf "\n\x1b[32mbuiding auth fe...\n\x1b[0m"

  AUTH_PATH="/home/samuel/current_tasks/personal/bokri/corner/clients/auth.ui"

  #change directory for a build
  cd $AUTH_PATH

  NODE_PATH=src npm run build

  if [ -d "$BUILD_DIR/builds/public/auth" ]; then
    rm -r $BUILD_DIR/builds/public/auth
  fi

  mv build $BUILD_DIR/builds/public/auth

  printf "\n\x1b[32mbuilt auth fe...\n\x1b[0m"
}

