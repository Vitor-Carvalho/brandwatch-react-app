#!/usr/bin/env bash
set -e -u -x

echo $GCP_SERVICE_ACCOUNT_KEY > key.json
gcloud auth activate-service-account --key-file key.json

VERSION=$(<source/.git/refs/heads/gcp-integration)
RESOURCE=$APP_NAME.$VERSION.tar.gz

cd build;
tar -xvzf $RESOURCE

rm $RESOURCE


mv index.html launchpad.html
gsutil -m rm -f gs://$STORAGE_BUCKET/**

gsutil -m cp -r * gs://$STORAGE_BUCKET

gsutil -m web set -m launchpad.html gs://$STORAGE_BUCKET

gsutil -m acl -r ch -u AllUsers:R gs://$STORAGE_BUCKET

gsutil -m setmeta -h "Content-Type:text/html" \
  -h "Cache-Control:no-cache" gs://$STORAGE_BUCKET/*.html

gsutil -m setmeta -h "Cache-Control:max-age=31536000" gs://$STORAGE_BUCKET/**.js

gsutil -m setmeta -h "Cache-Control:max-age=31536000" gs://$STORAGE_BUCKET/**.css
