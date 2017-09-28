#!/usr/bin/env bash
set -e -u

echo $GCP_SERVICE_ACCOUNT_KEY > key.json
gcloud auth activate-service-account --key-file key.json

cd build

if [ -r .git/id ]
  then #PR deploy
    PR_ID=$(< .git/id)
    export STORAGE_BUCKET="$PR_ID.$STORAGE_BUCKET"

    # make the bucket, gsutil throws if the bucket already exists
    ! gsutil mb -p $GCP_PROJECT gs://$STORAGE_BUCKET

    gcloud config set project $GCP_PROJECT

    # add a backend service to the load balancer
    ! gcloud compute backend-buckets create "pr-$PR_ID-$GCP_PROJECT" \
      --gcs-bucket-name=$STORAGE_BUCKET

    # forward all load balancer traffic to the new backend-bucket
    ! gcloud compute url-maps add-path-matcher "lb--$GCP_PROJECT" \
      --path-matcher-name="pr-$PR_ID-$GCP_PROJECT--path-matcher" \
      --default-backend-bucket "pr-$PR_ID-$GCP_PROJECT" \
      --new-hosts $STORAGE_BUCKET
fi

cd public;

# clear the bucket, gsutil throws if it's already empty
! gsutil -m rm -f gs://$STORAGE_BUCKET/**

# copy everything into the bucket
gsutil -m cp -r * gs://$STORAGE_BUCKET

# set the index html as the default
gsutil -m web set -m index.html gs://$STORAGE_BUCKET

# give all users access to everything
gsutil -m acl -r ch -u AllUsers:R gs://$STORAGE_BUCKET

# index file headers
gsutil -m setmeta -h "Content-Type:text/html" \
  -h "Cache-Control:no-cache" gs://$STORAGE_BUCKET/*.html

# javascript headers
gsutil -m setmeta -h "Cache-Control:max-age=31536000" gs://$STORAGE_BUCKET/**.js

# css headers
gsutil -m setmeta -h "Cache-Control:max-age=31536000" gs://$STORAGE_BUCKET/**.css
