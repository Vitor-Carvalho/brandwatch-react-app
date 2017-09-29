#!/usr/bin/env bash
set -e -u

cat > res.json << EOF
{
    "color": "danger",
    "title": "Test failure",
    "ts": $(date +%s),
    "text": "Error running unit tests"
}
EOF
source source/ci/scripts/create_message.sh

cd source
yarn install
yarn test:unit
