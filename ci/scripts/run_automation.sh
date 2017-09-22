#!/usr/bin/env bash

set -e -u -x

cat > res.json << EOF
{
    "color": "danger",
    "title": "Automation failure",
    "ts": $(date +%s),
    "text": "Error running automation tests"
}
EOF
. source/ci/scripts/create_message.sh
VERSION=$(<source/.git/refs/heads/$BRANCH)

mv dependency-cache/node_modules source
cd source
xvfb-run -a --server-args="-screen 0 1024x768x24" yarn test:ats --forceExit
cd ../

cat > res.json << EOF
{
    "color": "good",
    "link": "$REPO/commit/$VERSION",
    "title": "Successful deployment",
    "ts": $(date +%s),
    "text": "Pipeline deployment complete: \n $REPO/commit/$VERSION"
}
EOF

. source/ci/scripts/create_message.sh
