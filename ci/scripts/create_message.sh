#!/usr/bin/env bash
set -e -u

yarn global add mustache
mustache res.json source/ci/message/slack-message.mustache > messages/slack.txt

cat messages/slack.txt
