#!/bin/bash
#install_cache()
#{
#  if [ $CORNER_CACHE_DRIVER = "redis" ]; then
#    redis-server
#  fi
#}

install_asset()
{
  if [ $CORNER_ASSET_DRIVER = "seaweedfs" ]; then

    #/usr/bin/weed server -volume.publicUrl="192.168.99.115" -ip.bind="0.0.0.0" -master.port=9333 -volume.port=7001 -dir="/corner.asset"

   MSERVER_PORT=10333
   VSERVER_PORT=8083
   PUBLIC_URL="corner.meninet.com:$VSERVER_PORT"

   mkdir /corner.asset/mdir
   mkdir /corner.asset/vdir

   /usr/bin/weed master -mdir="/corner.asset/mdir" -port=$MSERVER_PORT -ip="0.0.0.0" &
   sleep 7
   /usr/bin/weed volume -dir="/corner.asset/vdir" -mserver="0.0.0.0:$MSERVER_PORT" -publicUrl=$PUBLIC_URL -ip="corner.asset" -port=$VSERVER_PORT
  fi
}

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
elif [ "$HOSTNAME" = "host.asset" ]; then
  install_asset
fi

