function readBarcode() {
	var scannedBarcode = null;
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			if($.trim(result.text) != "") {
				scannedBarcode = result.text;
				deleteProduct(scannedBarcode);
			} else if (result.cancelled == "true") {
				goToProductList();
			} else {
				scanFailed();
			}
		},
		function (error) {
			scanFailed();
		},
		{
			showTorchButton : true, // iOS and Android
			prompt : "Richt uw camera op een QR code, zodat deze binnen het vierkant valt.", // Android
			resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE" // default: all but PDF_417 and RSS_EXPANDED
		}
	);
	return scannedBarcode;
}

function deleteProduct(barcode) {
	var productsList = JSON.parse(app.storage.getItem(STORAGE_PRODUCTS));

	var pattern = new RegExp("[0-9]+-[0-9]+");
	if (pattern.test(barcode)) {
		var codeArr = barcode.split("-");
		var productCode = codeArr[0];
		var productDate = codeArr[1];
		var year = productDate.substring(0, 4);
		var month = productDate.substring(4, 6);
		var day = productDate.substring(6, 8);
		var dateToRemove = year + "-" + month + "-" + day;
		// var productsList = reusableFunctions.getObjectsOfArrayByParameter(productsList, productCode, "code");
		// var product = reusableFunctions.getObjectOfArrayByParameter(productsList, dateToRemove, "date");

		for(var i=0; i < productsList.length; i++) {
			if(productsList[i].code == productCode && productsList[i].date == dateToRemove) {
				productsList.splice(i, 1);
				app.storage.setItem(STORAGE_PRODUCTS, JSON.stringify(productsList));
				return;
			}
		}

		alert(JSON.stringify(product));
	} else {
		scanFailed();
	}
}

var barcodeResult = readBarcode();

function scanFailed() {
	navigator.notification.alert(
		'Het scannen van de code is niet gelukt. Probeer het opnieuw.',  // message
		null,         // callback
		'Oeps',            // title
		'Oké'                  // buttonName
	);
	goToProductList();
}

function goToProductList() {
	window.location.href = "?page=home"
}