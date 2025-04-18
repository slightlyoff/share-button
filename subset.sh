#!/bin/bash

MERGED="./fontawesome/merged.ttf"
COMBINED="./combined.woff2"

# TODO: to add/update an icon, you first have to clobber $MERGED. Automate.
# if [ ! -f $MERGED ]
# then
#  fonttools merge --output-file=$MERGED ./fontawesome/*.ttf
# fi

# Merge every time to avoid stale update bugs
fonttools merge --output-file=$MERGED ./fontawesome/*.ttf

# Share, Tweet, Link, Toot, LI Promote, Skeet, RSS
pyftsubset $MERGED --unicodes="U+F14D,U+F099,U+F0C1,U+F4F6,U+F08C,U+E671,U+F09E" \
  --flavor=woff2 --output-file=$COMBINED

base64 $COMBINED \
  | (readarray -t TXT; IFS=''; echo "${TXT[*]}") \
  >  "${COMBINED}.base64"