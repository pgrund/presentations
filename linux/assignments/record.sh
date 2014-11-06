#!/bin/bash
# assuming following files:
#	assignment1, assignment1.timing, assignment2 assignment2.timing, ...

# default filename: assignmentXX
PREFIX=${1:-assignment}

# default timing file: assignmentXX.timing
SUFFIX=${2:-timing}

LAST_ASSIGNMENT=$(find . -maxdepth 1 -type f -name "$PREFIX*[!.$SUFFIX]" | sort -V | tail -n1)
declare -i LAST_NUMBER
LAST_NUMBER=${LAST_ASSIGNMENT#*$PREFIX}
NEXT_FILE=$PREFIX$[LAST_NUMBER+1]

script -t 2>${NEXT_FILE}.$SUFFIX ${NEXT_FILE}

