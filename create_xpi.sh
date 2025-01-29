#!/bin/sh -ue
#
# Creates the XPI file for this plugin
#

XPI_NAME=gls_invoice_parsing_$(cat manifest.json | jq -r .version).xpi

zip -FS $XPI_NAME manifest.json CHANGELOG main.js parser.js icons/*.png _locales/*/*

echo
echo "Create $XPI_NAME"
echo
