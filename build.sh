#!/usr/bin/env bash

node_version=v6.9.5

###切换node版本
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
nvm use ${node_version}

# npm install
npm_install_date_start=$(date +%s)
# npm --registry=http://10.255.53.83/repository/npm-group/ install
npm --registry=https://registry.npm.taobao.org/ install

npm_install_date_end=$(date +%s)
echo "npm install 用时：$((npm_install_date_end-npm_install_date_start))秒"

# npm build
npm_build_date_start=$(date +%s)
npm run build
npm_build_date_end=$(date +%s)
echo "npm build 用时：$((npm_build_date_end-npm_build_date_start))秒"

node lib/create-index-html.js

# 上传到服务器
# rsync -r build/prod/public/ www@10.10.21.11:/data/html/public/dist/mobile-web/mall/

rm -rf dist
mkdir dist
cp -r build/prod/public-html dist/react-html
cp -r static dist/static
cd dist && zip -r mobile-react.war ./ && cd ..

