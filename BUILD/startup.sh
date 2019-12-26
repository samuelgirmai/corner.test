#!/bin/bash

MACHINE_FE="machine.asset"

START()
{
  docker-machine start $MACHINE_FE
}

START

