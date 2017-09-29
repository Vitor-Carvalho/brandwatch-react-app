#!/usr/bin/env bash
set -e -u

cat > res.json << EOF
{
    "color": "danger",
    "title": "Eslint failure",
    "ts": $(date +%s),
    "text": "Error running yarn lint"
}
EOF
source source/ci/scripts/create_message.sh

cd source
yarn install
yarn lint
