#!/usr/bin/env bash
set -e -u -x

cat > res.json << EOF
{
    "color": "danger",
    "title": "Build failure",
    "ts": $(date +%s),
    "text": "Error running build process"
}
EOF
source source/ci/scripts/create_message.sh

mv dependency-cache/node_modules source
cd source && yarn build

VERSION=$(<.git/refs/heads/$BRANCH)
RESOURCE=$APP_NAME.$VERSION.tar.gz

tar -cvzf $RESOURCE  --directory=./public .
cp ./$APP_NAME.$VERSION.tar.gz ../build
