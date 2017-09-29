#!/usr/bin/env bash
set -e -u

cat > res.json << EOF
{
    "color": "danger",
    "title": "Automation failure",
    "ts": $(date +%s),
    "text": "Error running automation tests"
}
EOF
. source/ci/scripts/create_message.sh

if [ -r source/.git/id ]
  then #PR deploy
    PR_ID=$(< source/.git/id)
    export STORAGE_BUCKET="$PR_ID.$STORAGE_BUCKET"
fi

export AT_BASE_URL="https://$STORAGE_BUCKET"

cd source
yarn install
xvfb-run -a --server-args="-screen 0 1024x768x24" yarn test:ats --forceExit
cd ../

cat > res.json << EOF
{
    "color": "good",
    "title": "Successful deployment",
    "ts": $(date +%s),
    "text": "Pipeline deployment complete"
}
EOF

. source/ci/scripts/create_message.sh
