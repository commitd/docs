#!/usr/bin/env bash
set -euo pipefail
IFS=$' \n\t'

usage() {
  echo -e ""
  echo -e "Usage: \\x1B[1m ci-config [-u <user> ] [-e <email>] [-h]"
  echo -e "\\x1B[0m"
  echo -e "\\tSet the git config for ci"
  echo -e ""
  echo -e "Options:"
  echo -e ""
  echo -e " -u | --user \\t git username"
  echo -e " -e | --email \\t git email"
  echo -e " -h | --help \\t show the help"
}

user=
email=


while [[ $# -gt 0 ]]
do
key="$1"

  case $key in
    -u | --user )     shift
                      user=$1
                      ;;
    -e | --email )    shift
                      email=$1
                      ;;
    -h | --help )     usage
                      exit
                      ;;
    * )               usage
                      exit 1
  esac
  shift
done

readonly LOG_FILE="/tmp/$(basename "$0").log"
section() { text="
###########################################################
# $*
###########################################################
"
echo "$text" | tee -a "$LOG_FILE" >&2 ; }
info()    { echo "[INFO]    $*" | tee -a "$LOG_FILE" >&2 ; }
fatal()   { echo "[FATAL]   $*" | tee -a "$LOG_FILE" >&2 ; exit 1 ; }

cleanup() {
  section Trap
  info "$(git config -l)"
}

if [[ "${BASH_SOURCE[0]}" = "$0" ]]; then
  trap cleanup EXIT

  section Setting git config
  info "setting user $user"
  git config user.name "$user"

  info "setting email $email"
  git config user.email "$email"

fi
