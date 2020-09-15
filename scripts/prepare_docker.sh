#!/bin/bash
echo "On docker $1"
docker cp Mau_phieu_TA.docx $1:/root
docker cp Mau_phieu_TV.docx $1:/root
docker cp test_linux.py $1:/root
docker cp install_in_docker.sh $1:/root
docker cp WingdingsRegular.ttf $1:/root
docker exec -it $1 bash -c 'cd && bash install_in_docker.sh'

