#!/bin/sh

grader_url=$1
input_url=$2
solution_url=$3

# echo "Grader:" $grader_url
# echo "Input:" $input_url

curl -s -o grader.mjs $grader_url
curl -s -o input.txt $input_url
curl -s -o solution.txt $solution_url

chmod +x grader.mjs
chmod +x input.txt
chmod +x solution.txt

node grader.mjs "input.txt" "solution.txt"
