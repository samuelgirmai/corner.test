#!/bin/bash

_HOME=/home/gidena

cd /opt/.corner/corner.test

$_HOME/.nvm/nvm-exec node ./node_modules/babel-cli/bin/babel-node.js ./main.js ./test/corner/issuance/001.sc offline 200000
