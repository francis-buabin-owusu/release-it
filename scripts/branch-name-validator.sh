#!/bin/bash
jenkins_branch_name="$1"
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"
branchName=''

if [[ -z "$jenkins_branch_name" ]]; then
  echo "$local_branch_name"
  branchName="$local_branch_name"
else
  echo "$jenkins_branch_name"
  branchName="$jenkins_branch_name"
  if [[ "$branchName" == "develop" || "$branchName" == "staging" || "$branchName" == "testing" ||  "$branchName" == "production" ]]; then
      exit 0
  fi
fi



valid_branch_regex='^((fix|feat|perf|style|test|refactor)\/)?(RES|Devops)\-[a-zA-Z0-9\-]+$'

message="
        🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️🚫⚠️
        Branch name validation failed
        You should rename your branch to a valid name
        Branch names must include RES
        Example (feat/RES-410, fix/RES-231, RES-446 etc )
        Please check and try again.
        "

if [[ ! "$branchName" =~ $valid_branch_regex ]]; then
    echo "$message"
    exit 1
else
    echo 'Branch name is Valid 🔥🔥🔥🔥'
fi
exit 0
