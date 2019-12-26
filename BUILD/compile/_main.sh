#!/bin/bash

source ./compile/auth.sh
source ./compile/mru.sh

compile_all()
{
  auth_compile
  mru_compile
}

