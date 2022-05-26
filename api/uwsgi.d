#!/bin/bash

APPDIR=/opt/crowdseq/api
PROC=/usr/local/bin/uwsgi
SERVERUSER=clay.parker
PATH=$PATH:/usr/bin

# Source in other key variables
. /etc/profile

# Ensure we're running as proper account
WHOAMI="/usr/bin/whoami"
if [ `$WHOAMI` != "$SERVERUSER" ]; then
  {
    #echo Invoking su $SERVERUSER -c $0 $1
    su "$SERVERUSER" -c "$0 $1"
    exit $?
  }
fi

 
start_uwsgi() {
  echo "Starting uWSGI Server..."
  cd ${APPDIR}
  ${PROC} --ini ${APPDIR}/uwsgi-prod.ini > /opt/crowdseq/logs/uwsgi/crowdseq_uwsgi.d.log 2>&1
  sleep 3
  PROCCOUNT=$(pgrep -f $PROC | wc -l)
  if [ $PROCCOUNT -ne 0 ]; then
    echo "uWSGI server started successfully."
  else
    echo "uWSGI server startup failed. Check for issues."
  fi
}

  
stop_uwsgi() {
  echo "Stopping uWSGI Server..."
  pkill -f $PROC
  sleep 3
  PROCCOUNT=$(pgrep -f $PROC | wc -l)
  if [ $PROCCOUNT -ne 0 ]; then
    pkill -9 -f $PROC
    sleep 3
  fi
  PROCCOUNT=$(pgrep -f $PROC | wc -l)
  if [ $PROCCOUNT -ne 0 ]; then
    echo "Problems stopping uWSGI server.  Check status."
  fi
}

status_uwsgi() {
  PROCCOUNT=$(pgrep -f $PROC | wc -l)
  echo "uWSGI Server Process Count: $PROCCOUNT"
  echo "uWSGI Server PIDS:"
  pgrep -f $PROC
}

case "$1" in
        start)
                start_uwsgi
                ;;
        stop)
                stop_uwsgi
                ;;
        status)
                status_uwsgi
                ;;
        *)
                echo $"Usage: $0 {start|stop|status}"
esac

