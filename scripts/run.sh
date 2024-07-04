#!/bin/bash

original_dir=$(pwd)

cd /usr/local/bin/manga-monitor || exit

npm run start
cd "$original_dir"
