#!/bin/bash
_HOME=/home/linuxhack

cd $_HOME/.corner/corner.tools/assetfs
PUBLIC_URL="localhost:8081"
./weed server -master.port=9333 -volume.port=8081 -dir="/var/lib/assetfs" -volume.publicUrl=$PUBLIC_URL
#./weed server -ip="192.168.60.4" -master.port=10333 -volume.port=8081 -dir="./data" -volume.publicUrl="192.168.70.4:8081"
#./weed master -publicUrl="apps.meninet.com" -mdir="." -port=9993 -ip="0.0.0.0" &
#./weed volume -publicUrl="apps.meninet.com" -dir="." -mserver="0.0.0.0:9993" -ip="0.0.0.0" -port=8081

