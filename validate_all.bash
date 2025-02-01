#!/usr/bin/env bash

SCHEMA_PREFIX="${SCHEMA_PREFIX:-./allstar.}"
SCHEMA_SUFFIX="${SCHEMA_SUFFIX:-.schema.json}"

for file in "$@" ; do
  if [ -e "$file" ] ; then

    # if we're given a directory, try again with the files in that directory
    if [ -d "$file" ] ; then
      "$0" "${file}"*
      exit
    fi

    # just the filename
    filename="${file##*/}"

    # strip the extension off of the filename
    filebase="${filename%%.*}"

    schema_filename="${SCHEMA_PREFIX}${filebase}${SCHEMA_SUFFIX}"

    if [ -f "${schema_filename}" ] ; then
      echo "Comparing '$filename' with schema '$schema_filename'"
      v8r --schema "${schema_filename}" "${file}"
    fi
  fi
done
