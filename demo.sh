#!/usr/bin/env bash

# Quick and dirty script to build and run hosted by api (koa)
cd ui && npm i && npm run build
cd ../api && npm i && npm start
