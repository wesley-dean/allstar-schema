#!/usr/bin/env bash

SCHEMA_PREFIX="${SCHEMA_PREFIX:-$(git rev-parse --show-toplevel)/schemae/allstar.}"
SCHEMA_SUFFIX="${SCHEMA_SUFFIX:-.schema.json}"

# test filenames look like this:
# tests/admin.01.yaml

for file in "$@" ; do
  if [ -e "$file" ] ; then

    # if we're given a directory, try again with the files in that directory
    if [ -d "$file" ] ; then
      "$0" "${file}"*
      exit
    fi

    # just the filename
    filename="${file##*/}"

    # strip the test number off of the filename
    filename_no_test="${filename%%.*}"

    # strip the extension off of the filename
    filebase="${filename_no_test%%.*}"

    schema_filename="${SCHEMA_PREFIX}${filebase}${SCHEMA_SUFFIX}"

    if [ -f "${schema_filename}" ] ; then
      echo "Comparing '$filename' with schema '$schema_filename'"
      v8r --schema "${schema_filename}" "${file}"
    fi
  fi
done
