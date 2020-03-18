#!/bin/bash

source ./compile/launcher.sh
source ./compile/auth.sh

compile_all()
{
  if [ "$1" = "launcher" ]; then
    launcher_compile
  elif [ "$1" = "auth" ]; then
    auth_compile
  elif [ "$1" = "all" ]; then
    launcher_compile
    auth_compile
  else
    printf "\n\x1b[31m$>compile [launcher|auth|all]\n\n\x1b[0m"
    exit
  fi

}

