#!/bin/bash

# $1 - grader URL
# $2 - input file URL
# $3 - solution file URL
docker run nicucomiati/test-grader:alpha $1 $2 $3