command -v fly >/dev/null 2>&1 || {
  echo >&2 "# Please install fly cli to deploy pipelines. Aborting."; exit 1;
}

command -v blackbox_cat >/dev/null 2>&1 || {
  echo >&2 "# Please install blackbox to deploy pipelines. Aborting."; exit 1;
}

function cleanup {
  echo "# Cleaning up unencrypted creds file"
  rm -f $CREDS_FILE
}

CREDS_FILE="ci/credentials.yml"

blackbox_edit_start "${CREDS_FILE}"
trap cleanup EXIT

fly -t example set-pipeline -p my-brandwatch -c ci/pipeline.yml --load-vars-from $CREDS_FILE
