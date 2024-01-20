#!/bin/bash

_HOME=/home/linuxhack

cd /opt/.corner/corner.test

$_HOME/.nvm/nvm-exec node ./node_modules/babel-cli/bin/babel-node.js ./main.js ./test/corner/issuance/003.sc offline 5 6559
