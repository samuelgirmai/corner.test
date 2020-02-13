#!/bin/bash

source ./compile/launcher.sh
source ./compile/auth.sh
source ./compile/rufta.sh

compile_all()
{
#  if [ "$1" = "launcher" ]; then
#    launcher_compile
  if [ "$1" = "auth" ]; then
    auth_compile
  elif [ "$1" = "rufta" ]; then
    rufta_compile $2
  elif [ "$1" = "all" ]; then
    auth_compile
    rufta_compile "all"
#    launcher_compile
  else
    printf "\n\x1b[31m$>compile [launcher|auth|rufta|all]\n\n\x1b[0m"
    exit
  fi

}

