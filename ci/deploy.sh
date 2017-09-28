command -v fly >/dev/null 2>&1 || {
  echo >&2 "# Please install fly cli to deploy pipelines. Aborting."; exit 1;
}

command -v blackbox_cat >/dev/null 2>&1 || {
  echo >&2 "# Please install blackbox to deploy pipelines. Aborting."; exit 1;
}

target=example
pipeline=
config=

while getopts ":t:p:c:" opt; do
  case $opt in
    t) target=$OPTARG;;
    p) pipeline=$OPTARG;;
    c) config=$OPTARG;;
  esac
done

if [ -z $target ]
  then
    echo >&2 "# Please provide a valid target parameter (-t). Aborting."; exit 1;
fi

if [ -z $pipeline ]
  then
    echo >&2 "# Please provide a valid pipeline parameter (-p). Aborting."; exit 1;
fi

if [ -z $config ]
  then
    echo >&2 "# Please provide a valid config parameter (-c). Aborting."; exit 1;
fi

function cleanup {
  echo "# Cleaning up unencrypted creds file"
  rm -f $CREDS_FILE
}

CREDS_FILE="ci/credentials.yml"

blackbox_edit_start "${CREDS_FILE}"
trap cleanup EXIT

fly -t $target set-pipeline -p $pipeline -c $config --load-vars-from $CREDS_FILE
