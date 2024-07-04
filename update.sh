#!/bin/bash

original_dir=$(pwd)

cd /usr/local/bin/manga-monitor || exit

npm install --legacy-peer-deps
npm run update
echo "MangaMonitor successfully updated 😎"

cd "$original_dir"