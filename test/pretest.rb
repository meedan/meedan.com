require_relative './helpers'

text_banner 'Rebuilding the site and starting test server...'

system `rm -rf build`

# Rebuild the site to ensure we test the latest static output
system 'npm run build'

# Start the server, and note the server PID so we can stop it post test
system 'node server.js && echo $! > test/server.pid'
