#!/bin/bash

MERGED="./fontawesome/merged.ttf"
COMBINED="./combined.woff2"

if [ ! -f $MERGED ]
then
  fonttools merge --output-file=$MERGED ./fontawesome/*.ttf
fi

# Share, Tweet, Link
pyftsubset $MERGED --unicodes="U+F14D,U+F099,U+F0C1" \
  --flavor=woff2 --output-file=$COMBINED

base64 $COMBINED \
  | (readarray -t TXT; IFS=''; echo "${TXT[*]}") \
  >  "${COMBINED}.base64"