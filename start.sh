#!/bin/bash
# start.sh
# the Dockerfile CMD

cd ${DEPLOYDIR}/current/

pm2 start server.js

pm2 logs --timestamp --lines 0

# static -p 8000 -a 0.0.0.0