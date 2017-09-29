#!/usr/bin/env bash
set -e -u

cat > res.json << EOF
{
    "color": "danger",
    "title": "Build failure",
    "ts": $(date +%s),
    "text": "Error running build process"
}
EOF

source source/ci/scripts/create_message.sh


cd source
yarn install
yarn build

mv public ../build
mv .git ../build
