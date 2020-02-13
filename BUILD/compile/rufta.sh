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

rufta_practner_compile()
{
  printf "\n\x1b[32mbuiding rufta/practner fe...\n\x1b[0m"

  PRACTNER_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/practner"
  #change directory for a build
  cd $PRACTNER_PATH

  if [ ! -d "$PRACTNER_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/practner" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/practner
  fi

  mv build $BUILD_DIR/builds/public/rufta/practner

  printf "\n\x1b[32mbuilt rufta/practner fe...\n\x1b[0m"
}

rufta_lab_compile()
{
  printf "\n\x1b[32mbuiding rufta/lab fe...\n\x1b[0m"

  LAB_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/lab"
  #change directory for a build
  cd $LAB_PATH

  if [ ! -d "$LAB_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/lab" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/lab
  fi

  mv build $BUILD_DIR/builds/public/rufta/lab

  printf "\n\x1b[32mbuilt rufta/lab fe...\n\x1b[0m"
}

rufta_pharmacy_compile()
{
  printf "\n\x1b[32mbuiding rufta/pharmacy fe...\n\x1b[0m"

  PHARMACY_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/pharmacy"
  #change directory for a build
  cd $PHARMACY_PATH

  if [ ! -d "$PHARMACY_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/pharmacy" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/pharmacy
  fi

  mv build $BUILD_DIR/builds/public/rufta/pharmacy

  printf "\n\x1b[32mbuilt rufta/pharmacy fe...\n\x1b[0m"
}

rufta_cashier_compile()
{
  printf "\n\x1b[32mbuiding rufta/cashier fe...\n\x1b[0m"

  CASHIER_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/cashier"
  #change directory for a build
  cd $CASHIER_PATH

  if [ ! -d "$CASHIER_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/cashier" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/cashier
  fi

  mv build $BUILD_DIR/builds/public/rufta/cashier

  printf "\n\x1b[32mbuilt rufta/cashier fe...\n\x1b[0m"
}

rufta_infotics_compile()
{
  printf "\n\x1b[32mbuiding rufta/infotics fe...\n\x1b[0m"

  INFOTICS_PATH="/home/samuel/current_tasks/personal/bokri/corner/rufta/infotics"
  #change directory for a build
  cd $INFOTICS_PATH

  if [ ! -d "$INFOTICS_PATH/node_modules" ]; then
    npm install
  fi

  npm run build

  if [ -d "$BUILD_DIR/builds/public/rufta/infotics" ]; then
    rm -r $BUILD_DIR/builds/public/rufta/infotics
  fi

  mv build $BUILD_DIR/builds/public/rufta/infotics

  printf "\n\x1b[32mbuilt rufta/infotics fe...\n\x1b[0m"
}

rufta_compile()
{
  mkdir -p $BUILD_DIR/builds/public/rufta

  if [ "$1" = "admin" ]; then
    rufta_admin_compile
  elif [ "$1" = "mru" ]; then
    rufta_mru_compile
  elif [ "$1" = "practner" ]; then
    rufta_practner_compile
  elif [ "$1" = "lab" ]; then
    rufta_lab_compile
  elif [ "$1" = "pharmacy" ]; then
    rufta_pharmacy_compile
  elif [ "$1" = "cashier" ]; then
    rufta_cashier_compile
  elif [ "$1" = "infotics" ]; then
    rufta_infotics_compile
  elif [ "$1" = "all" ]; then
    rufta_admin_compile
    rufta_mru_compile
    rufta_practner_compile
    rufta_lab_compile
    rufta_pharmacy_compile
    rufta_cashier_compile
    rufta_infotics_compile
  else
    printf "\n\x1b[31m$>rufta compile [admin|mru|practner|lab|pharmacy|cashier|infotics|all]\n\n\x1b[0m"
    exit
  fi
}
