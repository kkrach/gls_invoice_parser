/**
 * Scripts to parse given invoice
 *
 * Author: Karl Krach <gls_invoice_parser@kkrach.de>
 * Date:   2018/01/14
 * Tested: Firefox 134.0 (64 bit)
 */


function parse_invoice_text(invoice_text) {

	var recipient = "";
	var iban = ""
	var amount = "";
	var intended_use = "";

	var unparsable = "";
	var invoice_lines = invoice_text.split("\n");
	for (var cnt=0; cnt < invoice_lines.length; cnt++) {
		var line = invoice_lines[cnt].trim();
		if (line) {
			if (!recipient && (result = line.match(/Empfänger\s*[: ]+(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				recipient = result[1];
			}
			else if (!recipient && (result = line.match(/Inhaber\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				recipient = result[1];
			}
			else if (!recipient && (result = line.match(/Recipient\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				recipient = result[1];
			}
			else if (!iban && (result = line.match(/IBAN\s*:?\s*(([A-Z][A-Z][0-9 ]*[0-9])?)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				if (result[1]) {
					iban = result[1];
				}
			}
//			else if ((result = line.match(/.*BIC\s*:?\s*([A-Z0-9]*)/i)) != null) {
//				// use next line, as long result[1] is empty
//				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
//				if (!bic) {
//					bic = result[1].replace(/\(.*\)/, "");
//				}
//			}
			else if (!amount && (result = line.match(/Summe\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				amount = result[1].replace(/EUR|€/, "");
			}
			else if (!amount && (result = line.match(/Betrag\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				amount = result[1].replace(/EUR|€/, "");
			}
			else if (!amount && (result = line.match(/Total\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				amount = result[1].replace(/EUR|€/, "");
			}
			else if (!amount && (result = line.match(/Gesamt\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				amount = result[1].replace(/EUR|€/, "");
			}
			else if (!amount && (result = line.match(/Amount\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				amount = result[1].replace(/EUR|€/, "");
			}
			else if (!intended_use && (result = line.match(/Verwendungszweck\s*:?\s*(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				intended_use = result[1];
			}
			else if (!intended_use && (result = line.match(/Betreff\s*:?(.*)/i)) != null) {
				// use next line, as long result[1] is empty
				while (cnt < invoice_lines.length && result[1].trim().length == 0) result[1] = invoice_lines[++cnt];
				intended_use = result[1];
			}
			else {
				unparsable += line + "\n";
			}
		}
	}

	// if there is only one line, which could not be parsed and there is no recipient yet, use this line
	if (recipient == "" && unparsable.trim().split("\n").length == 1) {
		recispient = unparsable.trim();
	}

	return {
		recipient: recipient.trim(),
		iban: iban.trim(),
		amount: amount.trim(),
		intended_use: intended_use.trim(),
		unparsable: unparsable
	};
}

function reformat_amount(amount, lang) {
	var formatted = "n/a";

	var decSep = amount.substring(amount.length - 3, amount.length - 2);
	if (decSep == ',' || decSep == '.') {
		var intVal = amount.substring(0, amount.length - 3).replace(/[ ,.]/i, '');
		var decVal = amount.substring(amount.length - 2);

		if (lang.startsWith("en-")) {
			formatted = intVal + "." + decVal;
		}
		else if (lang.startsWith("de-")) {
			formatted = intVal + "," + decVal;
		}
		else {
			// not supported
			formatted = amount;
		}
	}
	else {
		// assuming no decimal separator
		formatted = amount.replace(/[ ,.]/i, '');
	}

	//console.log("Reformatting amount '" + amount + "' to '" + formatted + "' for language " + lang);
	return formatted;
}

// needed for node.js tests
if (typeof module != 'undefined') {
	module.exports = { parse_invoice_text, reformat_amount };
}
