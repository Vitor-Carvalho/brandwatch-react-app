#!/usr/bin/env bash

yarn global add mustache
mustache res.json source/ci/message/slack-message.mustache > messages/slack.txt

cat messages/slack.txt
