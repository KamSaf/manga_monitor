#!/bin/bash

if [ -d "/dist" ]; then
  if [ -z "$(ls -A /dist)" ]; then
    npm run build
  fi
  npm run start
else
  npm run build-and-start
fi
