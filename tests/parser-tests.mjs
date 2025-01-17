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
DE45700400410277971803
BIC:
COBADEFFXXX (Commerzbank)
Betrag:
12,22 EUR
Verwendungszweck:
2017-22883773-1 Norbert Bluem`, recipient: "CHECK24", iban: "DE45700400410277971803", amount: "12,22", intended_use: "2017-22883773-1 Norbert Bluem" } );


test_parser( { invoice_text: `Unsere Bankverbindung::
IBAN: DE86400400280426647402
BIC: COBADEFFXXX
AMBIENDO GmbH & Co. KG
Verwendungszweck: 29083773893
Betrag: 87,21 EUR`, recipient: "", iban: "DE86400400280426647402", amount: "87,21", intended_use: "29083773893" } );


test_parser( { invoice_text: `Bankverbindung:
IBAN: DE63258501100045105970
SWIFT/BIC: NOLADE21UEL
Kontonummer 45105970 von Hobbydirekt Modellbau
BLZ: 25850110 bei der KSK Uelzen
Bei Zahlung per Bitcoin unsere Empfängeradresse: 3FLbjYnqZzKJ5SE4qiPNSFmRfaLKe5mxsX
Betreff: Ihre Auftragsnummer
Kontoinhaber:
Hobbydirekt Modellbau e.K.
Marco Lohse
Am Deich 13
D-29475 Meetschow`, recipient: "Hobbydirekt Modellbau e.K.", iban: "DE63258501100045105970", amount: "", intended_use: "Ihre Auftragsnummer" } );


test_parser( { invoice_text: `Überweisung per Vorkasse

Schaaf & Klemm GbR - Weine der Pfalz
Kto: 254459702
BLZ: 60010070
Betreff: Ihre Bestellnummer
Postbank Stuttgart

Internationale Zahlungen:
IBAN: DE19600100700254459702
BIC / SWIFT: PBNKDEFF`, recipient: "", iban: "DE19600100700254459702", amount: "", intended_use: "Ihre Bestellnummer" } );


test_parser( { invoice_text: ` Bankverbindung:
Bankinstitut: Aachener Bank
Bankleitzahl: 39060180
Kontonummer: 149077014
Inhaber: Günther Bogenrieder
IBAN: DE06 3906 0180 0149 0770 14
BIC: GENODED1AAC
R Ü C K F R A G E N:
Sollten Sie noch weitere Fragen zu dieser Bestellung haben, dann geben Sie bitte in jeder Email die Bestellnr. 271391 an.`,
recipient: "Günther Bogenrieder", iban: "DE06 3906 0180 0149 0770 14", amount: "", intended_use: "" } );




test_parser( { invoice_text: `Bankverbindung:
 		
		Vorkassen-Konto:
 		 Commerzbank Karlsruhe
  		 BLZ 66080052
  		 Kto 612915800
  		 Swift: DRESDEFF660
  		 IBAN: DE23 6608 0052 0612 9158 00
 
		Rechnungs-Konto:
  		 Volksbank Karlsruhe
  		 BLZ 66190000
  		 Kto 40006338
  		 Swift: GENODE61KA1
  		 IBAN: DE25 6619 0000 0040 0063 38

USt.-ID:	DE261441153`, recipient: "", iban: "DE23 6608 0052 0612 9158 00", amount: "", intended_use: "" } );


test_parser( { invoice_text: `
Empfänger:

MMKS GmbH
BIC/SWIFT: COBADEFF700
IBAN: DE79700400410662769900
BLZ: 700 400 41
Konto Nr.: 6627699
Commerzbank

`, recipient: "MMKS GmbH", iban: "DE79700400410662769900", amount: "", intended_use: "" } );



function test_parser({ invoice_text: invoice_text, recipient: recipient, iban: iban, amount: amount, intended_use: intended_use } ) {
	if (typeof test_parser.counter == 'undefined') {
		test_parser.counter = 0;
	}
	++test_parser.counter;

	//console.log(invoice_text);

	var result = parse_invoice_text(invoice_text);

	if (result.recipient != recipient) {
		console.error("[" + test_parser.counter + "] ERROR: Recipient is '" + result.recipient + "' but '" + recipient + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Recipient '" + result.recipient + "'");
	}

	if (result.iban != iban) {
		console.error("[" + test_parser.counter + "] ERROR: IBAN is '" + result.iban + "' but '" + iban + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: IBAN '" + result.iban + "'");
	}

	if (result.amount != amount) {
		console.error("[" + test_parser.counter + "] ERROR: Amount is '" + result.amount + "' but '" + amount + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Amount '" + result.amount + "'");
	}

	if (result.intended_use != intended_use) {
		console.error("[" + test_parser.counter + "] ERROR: Intended-use is '" + result.intended_use + "' but '" + intended_use + "' expected" );
	}
	else {
		console.log("[" + test_parser.counter + "]    OK: Intended-use '" + result.intended_use + "'");
	}
}
