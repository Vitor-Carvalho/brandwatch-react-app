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

mv dependency-cache/node_modules source
cd source && yarn build

mv public ../build
mv .git ../build
