/**
 * Scripts to parse given invoice
 *
 * Author: Karl Krach <gls_invoice_parser@kkrach.de>
 * Date:   2018/01/14
 * Tested: Firefox 134.0 (64 bit)
 */

function parse_invoice_text(text) {
	window.alert("not implemented yet: " + text);

	var recipient = "Charly";
	var iban = "DE01 2345 6789 0123 4567 89"
	var amount = "12.77";
	var intended_use = "MA7798";

	return {
		recipient: recipient,
		iban: iban,
		amount: amount,
		intended_use: intended_use
	};
}
