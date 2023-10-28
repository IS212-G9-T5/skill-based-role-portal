#!/bin/bash
set -e

POSTGRES="psql -v ON_ERROR_STOP=1 --username ${POSTGRES_USER}"

echo "Creating databases..."
for db in ${POSTGRES_DATABASES//,/ }
do
    $POSTGRES <<-EOSQL
        CREATE DATABASE $db;
EOSQL
done
