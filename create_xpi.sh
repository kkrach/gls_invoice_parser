#!/bin/sh -ue
#
# Creates the XPI file for this plugin
#

zip -FS gls_invoice_parsing.xpi manifest.json icons/*.png main.js parser.js _locales/*/*

echo
echo "Create gls_invoice_parsing.xpi"
echo
