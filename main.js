/**
 * Script to add a textbox to the GLS online banking, to extract IBAN, BIC, etc. from invoice text.
 *
 * Author: Karl Krach <gls_invoice_parser@kkrach.de>
 * Date:   2018/01/14
 * Tested: Firefox 134.0 (64 bit)
 */

console.log("Loaded extension of 'gls_invoice_parser'");
insertInvoidParserElements();

function requiredElementsFound() {
	try {
		// just try to get the input fields, needed for operation
		getRecipientInput();
		getIbanInput();
		getAmountInput();
		getIntendedUseInput();
		return true;
	} catch (e) {
		return false;
	}
}

function getRecipientInput() {
	var recipient_input = document.getElementById("mat-input-2");
	if (!recipient_input) throw Error("Cannot find recipient input!");
	return recipient_input;
}

function getIbanInput() {
	var iban_inputs = document.getElementsByClassName("iban-input");
	if (iban_inputs.length != 1) {
		throw new Error("Excpected exactly 1 iban-input, got " + iban_inputs.length);
	}
	var iban_input = iban_inputs[0];
	if (!iban_input) throw new Error("Iban input does not exist!");
	return iban_input;
}

function getAmountInput() {
	var amount_input = document.getElementById("mat-input-3");
	if (!amount_input) throw new Error("Cannot find amount input!");
	return amount_input;
}

function getIntendedUseInput() {
	var intended_use_textarea = document.getElementById("mat-input-0");
	if (!intended_use_textarea) throw new Error("Cannot find intended-use input!");
	return intended_use_textarea;
}

function searchFormRow() {
	var recipient_input = getRecipientInput();
	var mat_form_field = getFirstParentWithTagname(recipient_input, "mat-form-field");
	var left_column = mat_form_field.parentElement;
	if (!left_column) {
		throw new Error("mat-form-field has no parent!");
	}
	var formRow = left_column.parentElement;
	if (!formRow) {
		throw new Error("Cannot find form row!");
	}
	return formRow;
}

function insertInvoidParserElements() {
	if (requiredElementsFound()) {
		try {
			var formRow = searchFormRow();
			var invoice_parser_input = createInvoiceParserInput();
			formRow.parentElement.insertBefore(invoice_parser_input, formRow);
		} catch (e) {
			console.error("GIP: " + e);
		}
	}
	else {
		console.log("Cannot find required elements for invoice parser... trying again in 2 seconds...");
		setTimeout(insertInvoidParserElements, 2000);
	}
}

function getFirstParentWithTagname(elem, tagname) {
	if (!elem.parentElement) {
		throw new Error("Cannot find tagname '" + tagname + "' in parents!");
	}
	console.debug("Parent is " + elem.parentElement.tagName + " vs " + tagname);
	if (elem.parentElement.tagName.toLowerCase() == tagname.toLowerCase()) {
		return elem.parentElement;
	}
	return getFirstParentWithTagname(elem.parentElement, tagname);
}

//function open_info_window() {
//	// open some info at kkrach.de
//	window.alert("Not implemented");
//}

function parse_invoice_input() {
	var srcId = "invoice-parser-textarea";
	var src = document.getElementById(srcId);
	if (!src) {
		console.error("Cannot find element with id '" + srcId + "'!");
		return ;
	}

	// parse given text
	const { recipient, iban, amount, intended_use, unparsable } = parse_invoice_text(src.value);

	console.log("Received recipient='" + recipient + "' iban='" + iban + "' amount='" + amount + "' intended_use='" + intended_use);
	console.log("Unparsable='" + unparsable + "'");

	var valuesInserted = false;
	if (recipient) {
		var element = getRecipientInput();
		element.value = recipient;
		element.dispatchEvent(new Event('input', { bubbles: true }));
		element.focus();
		valuesInserted = true;
	}
	if (iban) {
		var element = getIbanInput();
		element.value = iban;
		element.dispatchEvent(new Event('input', { bubbles: true }));
		element.focus();
		valuesInserted = true;
	}
	if (amount) {
		var element = getAmountInput();
		element.value = amount;
		element.dispatchEvent(new Event('input', { bubbles: true }));
		element.focus();
		valuesInserted = true;
	}
	if (intended_use) {
		var element = getIntendedUseInput();
		element.value = intended_use;
		element.dispatchEvent(new Event('input', { bubbles: true }));
		element.focus();
		valuesInserted = true;
	}
	//src.value = unparsable.trim();
	src.focus();
	if (valuesInserted) {
		var verifyMessage = document.getElementById("invoce-parser-verify-msg");
		verifyMessage.style.visibility = "visible";
	}
}

function createInvoiceParserInput() {
	let parse_button_text = browser.i18n.getMessage("parseButtonText");
	let input_box_description = browser.i18n.getMessage("inputBoxDescription");

	var container = document.createElement("div");
	container.className = "d-flex justify-content-start kf-margin-bottom-16 function-button-row";

	var form = document.createElement("mat-form-field");
	form.className = "mat-mdc-form-field topbarScrollMarginTop mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted";
	container.appendChild(form);

	var wrapper = document.createElement("div");
	wrapper.className = "mat-mdc-text-field-wrapper mdc-text-field mdc-text-field--filled";
	form.appendChild(wrapper);

	var flex = document.createElement("div");
	flex.className = "mat-mdc-form-field-flex";
	wrapper.appendChild(flex);

	var infix = document.createElement("div");
	infix.className = "mat-mdc-form-field-infix";
	flex.appendChild(infix);

//	var info = document.createElement("div");
//	info.className = "kf-field-char-counter";
//	infix.appendChild(info);
//
//	var infoSpan = document.createElement("span");
//	infoSpan.appendChild(document.createTextNode("ⓘ"));
//	infoSpan.style.cursor = "pointer";
//	infoSpan.onclick = open_info_window;
//	info.appendChild(infoSpan);

	var label = document.createElement("label");
	label.className = "mdc-floating-label mat-mdc-floating-label ng-star-inserted mdc-floating-label--float-above";
	label.setAttribute("for", "invoice-parser-textarea");
	infix.appendChild(label);

	var matLabel = document.createElement("mat-label");
	matLabel.setAttribute("for", "invoice-parser-textarea");
	matLabel.appendChild(document.createTextNode(input_box_description));
	label.appendChild(matLabel);

	var inputField = document.createElement("textarea");
	inputField.id = "invoice-parser-textarea";
	inputField.className = "mat-mdc-input-element cdk-textarea-autosize mat-mdc-form-field-textarea-control mat-mdc-form-field-input-control mdc-text-field__input ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored";
	inputField.style.height = "120px";
	//inputField.appendChild(document.createTextNode("lala"));
	infix.appendChild(inputField);

	var verifyMessage = document.createElement("div");
	verifyMessage.id = "invoce-parser-verify-msg";
	verifyMessage.style = "color: #00d75c; text-align: center; visibility: hidden";
	var verifyIcon = document.createElement("span");
	verifyIcon.className="kf-icon-font-container";
	verifyIcon.style = "font-family: kf-icon-font-24; font-size: 24pt; position: relative; top: 10px;";
	verifyIcon.appendChild(document.createTextNode("ic_warnschild_24"));
	verifyMessage.appendChild(verifyIcon);
	verifyMessage.appendChild(document.createTextNode(" The content was parsed successfully! Please verify the inserted data..."));
	form.appendChild(verifyMessage);

	var button = document.createElement("button");
	button.className = "kf-button-min-size-s function-button mdc-button mat-mdc-button mat-primary mat-mdc-button-base ng-star-inserted";
	button.type = "button";
	button.onclick = parse_invoice_input;
	button.appendChild(document.createTextNode(parse_button_text));
	container.appendChild(button);

	return container;
}
