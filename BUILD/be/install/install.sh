#!/bin/bash
#install_cache()
#{
#  if [ $CORNER_CACHE_DRIVER = "redis" ]; then
#    redis-server
#  fi
#}

install_fs()
{
  if [ ! -d "/corner.lg.fs/boot" ]; then
    tar -xvf corner.tar.gz -C /corner.lg.fs/
  fi

  cd /corner.lg.fs/

  if [ $CORNER_FS_DRIVER = "rethinkdb" ]; then
    /etc/init.d/rethinkdb start && pm2-runtime start ./boot/main.js --interpreter ./node_modules/babel-cli/bin/babel-node.js
  elif [ $CORNER_FS_DRIVER = "mongodb"  ]; then
    /usr/bin/mongod --dbpath=/corner.fs --bind_ip=0.0.0.0 && pm2-runtime start ./boot/main.js --interpreter ./node_modules/babel-cli/bin/babel-node.js
  fi
}

install_lg()
{
  if [ ! -d "/corner.lg.lg/boot" ]; then
    tar -xvf corner.tar.gz -C /corner.lg.lg/
  fi

  cd /corner.lg.lg/
  redis-server /etc/redis/redis.conf && pm2-runtime start ./boot/main.js --interpreter ./node_modules/babel-cli/bin/babel-node.js
}

if [ "$HOSTNAME" = "host.fs" ]; then
  install_fs
elif [ "$HOSTNAME" = "host.lg" ]; then
  install_lg
#elif [ "$HOSTNAME" = "host.cache" ]; then
#  install_cache
fi

