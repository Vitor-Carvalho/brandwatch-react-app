#!/usr/bin/env bash

set -e -u -x

cat > res.json << EOF
{
    "color": "danger",
    "title": "Test failure",
    "ts": $(date +%s),
    "text": "Error running unit tests"
}
EOF
source source/ci/scripts/create_message.sh

mv dependency-cache/node_modules source
cd source && yarn test:unit
