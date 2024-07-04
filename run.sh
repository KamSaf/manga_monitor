#!/bin/bash

original_dir=$(pwd)

cd /usr/local/bin/manga-monitor || exit

if [ -d "/app" ]; then
  if [ -z "$(ls -A /app)" ]; then
    npm run build
  fi
  npm run start
else
  npm run build-and-start
fi

cd "$original_dir"
