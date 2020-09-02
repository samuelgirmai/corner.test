#!/bin/bash
cd srv/
./weed server  -master.port=10333 -volume.port=8081 -dir="./data"
#./weed master -publicUrl="apps.meninet.com" -mdir="." -port=9993 -ip="0.0.0.0" &
#./weed volume -publicUrl="apps.meninet.com" -dir="." -mserver="0.0.0.0:9993" -ip="0.0.0.0" -port=8081

