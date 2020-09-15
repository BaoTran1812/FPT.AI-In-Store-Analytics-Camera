#!/bin/bash
echo "On docker $1"
docker exec -it $1 bash -c 'cd && python3 test_linux.py'

