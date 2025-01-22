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


test_parser( { invoice_text: `Überweisung an CHECK24
Zahlungsempfänger:
CHECK24
IBAN:
DE12345678901234567890
BIC:
COBADEFFXXX (Commerzbank)
Betrag:
12,22 EUR
Verwendungszweck:
2017-22883773-1 Markus Mustermann`, recipient: "CHECK24", iban: "DE12345678901234567890", amount: "12,22", intended_use: "2017-22883773-1 Markus Mustermann" } );


test_parser( { invoice_text: `Unsere Bankverbindung::
IBAN: NL12345678901234567890
BIC: COBADEFFXXX
AMBIENDO GmbH & Co. KG
Verwendungszweck: 29083773893
Betrag: 87,21 EUR`, recipient: "", iban: "NL12345678901234567890", amount: "87,21", intended_use: "29083773893" } );


test_parser( { invoice_text: `Bankverbindung:
IBAN: PT12345678901234567890
SWIFT/BIC: NOLADE21UEL
Kontonummer 1234567 von Hobbydirekt Modellbau
BLZ: 25850110 bei der BB Uelzen
Bei Zahlung per Bitcoin unsere Empfängeradresse: 3FLbjYnqZzKJ5SmRfaLKe5mxsX
Betreff: Ihre Auftragsnummer
Kontoinhaber:
Hobbydirekt Modellbau e.K.
Stefan Mustermann
Im Lock 13
D-334532 Berlin`, recipient: "Hobbydirekt Modellbau e.K.", iban: "PT12345678901234567890", amount: "", intended_use: "Ihre Auftragsnummer" } );


test_parser( { invoice_text: `Überweisung per Vorkasse

Schaaf & Klemm GbR - Weine der Pfalz
Kto: 254459702
BLZ: 60010070
Betreff: Ihre Bestellnummer
Postbank Stuttgart

Internationale Zahlungen:
IBAN: GB12345678901234567890
BIC / SWIFT: PBNKDEFF`, recipient: "", iban: "GB12345678901234567890", amount: "", intended_use: "Ihre Bestellnummer" } );


test_parser( { invoice_text: ` Bankverbindung:
Bankinstitut: Aachener Bank
Bankleitzahl: 12345678
Kontonummer: 12345678
Inhaber: Günther Mustermann
IBAN: DE06 1234 0180 0149 0770 14
BIC: GENODED1AAC
R Ü C K F R A G E N:
Sollten Sie noch weitere Fragen zu dieser Bestellung haben, dann geben Sie bitte in jeder Email die Bestellnr. 271391 an.`,
recipient: "Günther Mustermann", iban: "DE06 1234 0180 0149 0770 14", amount: "", intended_use: "" } );


test_parser( { invoice_text: `Bankverbindung:
 		
		Vorkassen-Konto:
 		 Commerzbank Karlsruhe
  		 BLZ 66080052
  		 Kto 612915800
  		 Swift: DRESDEFF660
  		 IBAN: DE12 3456 0052 0612 9158 00
 
		Rechnungs-Konto:
  		 Volksbank Karlsruhe
  		 BLZ 66190000
  		 Kto 40006338
  		 Swift: GENODE61KA1
  		 IBAN: DE12 3456 0000 0040 0063 38

USt.-ID:	DE261441153`, recipient: "", iban: "DE12 3456 0052 0612 9158 00", amount: "", intended_use: "" } );


test_parser( { invoice_text: `
Empfänger:

MMKS GmbH
BIC/SWIFT: COBADEFF700
IBAN: DE12345678901234567890
BLZ: 700 400 41
Konto Nr.: 6627699
Commerzbank

`, recipient: "MMKS GmbH", iban: "DE12345678901234567890", amount: "", intended_use: "" } );


test_parser( { invoice_text: `Spendenkonto
Parlamentwatch e.V., Kto.: 2011 120 000, BLZ: 430 609 67 bei der GLS Bank,
IBAN: DE03 4306 1234 2011 1234 00, BIC: GENODEM1GLS
Als gemeinnütziger Verein stellen wir Ihnen gerne eine Spendenbescheinigung aus.
`, recipient: "", iban: "DE03 4306 1234 2011 1234 00", amount: "", intended_use: ""} );


// template and test for empty input
test_parser( { invoice_text: ``, recipient: "", iban: "", amount: "", intended_use: ""} );



function test_parser({ invoice_text: invoice_text, recipient: target_recipient, iban: target_iban, amount: target_amount, intended_use: target_intended_use } ) {
	if (typeof test_parser.counter == 'undefined') {
		test_parser.counter = 0;
	}
	++test_parser.counter;

	//console.log(invoice_text);

	const { recipient, iban, amount, intended_use } = parse_invoice_text(invoice_text);

	if (target_recipient != recipient) {
		console.error("[" + test_parser.counter + "] ERROR: Recipient is '" + recipient + "' but '" + target_recipient + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Recipient '" + recipient + "'");
	}

	if (target_iban != iban) {
		console.error("[" + test_parser.counter + "] ERROR: IBAN is '" + iban + "' but '" + target_iban + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: IBAN '" + iban + "'");
	}

	if (target_amount != amount) {
		console.error("[" + test_parser.counter + "] ERROR: Amount is '" + amount + "' but '" + target_amount + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Amount '" + amount + "'");
	}

	if (target_intended_use != intended_use) {
		console.error("[" + test_parser.counter + "] ERROR: Intended-use is '" + intended_use + "' but '" + target_intended_use + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Intended-use '" + intended_use + "'");
	}
}
