#!/bin/bash
# start.sh
# the Dockerfile CMD

pm2 start server.js

pm2 logs --timestamp --lines 0

