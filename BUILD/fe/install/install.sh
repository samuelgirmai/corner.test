#!/bin/bash

decompress()
{
  tar -xvf corner.tar.gz -C /corner.fe/
}

run_fe()
{
  cd /corner.fe
  
  pm2-runtime start ./main.js --interpreter ./node_modules/babel-cli/bin/babel-node.js
  #serve -s auth -l 3001
}

if [ "$HOSTNAME" = "host.fe" ]; then
  decompress

  run_fe
fi

