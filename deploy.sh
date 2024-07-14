#!/bin/bash
set -eux

export NODE_OPTIONS='--openssl-legacy-provider'

cp ../bussproofs-html/docs/assets/prooftree.js app/pages/prooftree.js 

yarn build 
git add --all 
git commit -m updated 
git push
