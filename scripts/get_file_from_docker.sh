#!/bin/bash
echo "On docker $1"
rm -f docker_mau_TA.pdf
rm -f docker_mau_TV.pdf
docker cp  $1:/root/mau_TV.pdf docker_mau_TV.pdf
docker cp  $1:/root/mau_TA.pdf docker_mau_TA.pdf

