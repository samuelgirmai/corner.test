#!/bin/bash

configure_all()
{
  CONFIG_SCRIPT_PATH="/home/samuel/current_tasks/personal/bokri/corner/clients/BUILD/configure"

  #change directory to configure script

  cd $CONFIG_SCRIPT_PATH

  npm run configure
}

