#!/usr/bin/env bash

set -euo pipefail

BASE_SCHEMA="${BASE_SCHEMA:-https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/schemas/json/base.json}"

for file in "$@" ; do
  if [ -e "$file" ] ; then

    # if we're given a directory, try again with the files in that directory
    if [ -d "$file" ] ; then
      "$0" "${file}"*
      exit
    fi

    v8r --schema "${BASE_SCHEMA}" "${file}"
  fi
done
