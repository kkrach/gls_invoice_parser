/**
 * Tests for the parser script
 *
 * Author: Karl Krach <gls_invoice_parser@kkrach.de>
 * Date:   2018/01/14
 * Tested: node.js v18.19.1
 *
 * To be executed with: node parser-tests.mjs
 */

import pkg from '../parser.js';
const { parse_invoice_text } = pkg;



test_parser("", "huhu", "haha", "12,23", "hihi");
test_parser("", "Charly", "haha", "12,23", "hihi");





function test_parser(text, recipient, iban, amount, intended_use) {
	if (typeof test_parser.counter == 'undefined') {
		test_parser.counter = 0;
	}
	++test_parser.counter;

	var values = parse_invoice_text(text);

	if (values.recipient != recipient) {
		console.error("[" + test_parser.counter + "] ERROR: Recipient does not match: '" + values.recipient + "' received but '" + recipient + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Recipient");
	}

	if (values.iban != iban) {
		console.error("[" + test_parser.counter + "] ERROR: IBAN does not match: '" + values.iban + "' received but '" + iban + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: IBAN");
	}

	if (values.amount != amount) {
		console.error("[" + test_parser.counter + "] ERROR: Amount does not match: '" + values.amount + "' received but '" + amount + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Amount");
	}

	if (values.intended_use != intended_use) {
		console.error("[" + test_parser.counter + "] ERROR: Intended-use does not match: '" + values.intended_use + "' received but '" + intended_use + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Intended-use");
	}
}
