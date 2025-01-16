/**
 * Script to add a textbox to the GLS online banking, to extract IBAN, BIC, etc. from invoice text.
 *
 * Author: Karl Krach <gls_invoice_parser@kkrach.de>
 * Date:   2018/01/14
 * Tested: Firefox 57.0.4 (64 bit)
 */

console.log("Loaded script of 'gls_invoice_parser'");

searchForTransferForms();

function searchForTransferForms() {
	var recipient_input = document.getElementById("mat-input-2");
	if (recipient_input) {
		console.log("SUCCESS1: " + recipient_input.value);
		recipient_input.value = "Charly";
		var iban_inputs = document.getElementsByClassName("iban-input");
		if (iban_inputs) {
			var iban_input = iban_inputs[0];
			console.log("SUCCESS2: " + iban_input.value);
			iban_input.value = "DE01 2345 6789 0123 4567 89"
			var amount_input = document.getElementById("mat-input-3");
			if (amount_input) {
				console.log("SUCCESS3: " + amount_input.value);
				amount_input.value = "12.77";
				var intended_use_textarea = document.getElementById("mat-input-0");
				if (intended_use_textarea) {
					console.log("SUCCESS4: " + intended_use_textarea.value);
					intended_use_textarea.value = "MA7798";
				}
			}
		}

		var mat_form_field = goToParentUntilTagname(recipient_input, "mat-form-field");
		if (mat_form_field) {
			console.log("SUCCESS5: " + mat_form_field)
			var left_column = mat_form_field.parentElement;
			if (left_column) {
				console.log("SUCCESS6: " + left_column)
				var row = left_column.parentElement;
				if (row) {
					console.log("SUCCESS7: " + row)
					//row.style.border = "2px solid blue";
					var invoice_parser_input = createInvoiceParserInput();
					row.parentElement.insertBefore(invoice_parser_input, row);
				}
			}
		}
	}
	else {
		console.log("Cannot find recipient input... trying again in 2 seconds...");
		setTimeout(searchForTransferForms, 2000);
	}
}

function goToParentUntilTagname(elem, tagname) {
	if (elem.parentElement) {
		console.log("Parent is " + elem.parentElement.tagName + " vs " + tagname);
		if (elem.parentElement.tagName.toLowerCase() == tagname.toLowerCase()) {
			return elem.parentElement;
		}
		return goToParentUntilTagname(elem.parentElement, tagname);
	}
	return undefined;
}

function createInvoiceParserInput() {
	var container = document.createElement("div");
	container.className = "d-flex justify-content-start kf-margin-bottom-16 function-button-row";

	var form = document.createElement("mat-form-field");
	form.className = "mat-mdc-form-field topbarScrollMarginTop ng-tns-c2608167813-3 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted";
	container.appendChild(form);

	var wrapper = document.createElement("div");
	wrapper.className = "mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-3 mdc-text-field--filled";
	form.appendChild(wrapper);

	var flex = document.createElement("div");
	flex.className = "mat-mdc-form-field-flex";
	wrapper.appendChild(flex);

	var infix = document.createElement("div");
	infix.className = "mat-mdc-form-field-infix";
	flex.appendChild(infix);

	var label = document.createElement("label");
	label.className = "mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-0 ng-star-inserted mdc-floating-label--float-above";
	infix.appendChild(label);

	var matLabel = document.createElement("mat-label");
	matLabel.appendChild(document.createTextNode("Paste your invoice here - and click on 'parse' afterwards"));
	label.appendChild(matLabel);

	var info = document.createElement("div");
	info.className = "kf-field-char-counter";
	info.appendChild(document.createTextNode("ⓘ"));
	info.style.cursor = "pointer";
	infix.appendChild(info);

	var inputField = document.createElement("textarea");
	inputField.className = "mat-mdc-input-element cdk-textarea-autosize ng-tns-c2608167813-0 mat-mdc-form-field-textarea-control mat-mdc-form-field-input-control mdc-text-field__input ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored";
	inputField.style.height = "120px";
	//inputField.appendChild(document.createTextNode("lala"));
	infix.appendChild(inputField);

	var button = document.createElement("button");
	button.className = "kf-button-min-size-s function-button mdc-button mat-mdc-button mat-primary mat-mdc-button-base ng-star-inserted";
	button.type = "button";
	button.appendChild(document.createTextNode("Parse"));
	container.appendChild(button);

	return container;
}


