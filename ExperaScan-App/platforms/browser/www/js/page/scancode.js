function readBarcode() {
	var scannedBarcode = null;
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			if($.trim(result.text) != "") {
				scannedQR = result.text;
				getProducts(scannedQR);
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

function getProducts(id) {
	var productsCallResult = null;
	$.ajax({
		type: 'GET',
		data: {},
		url: API.baseUrl + "getOrder" + id,
		dataType: 'json',
		async: false,
		success: function(jsonData){
			console.log(jsonData);
			productsCallResult = jsonData.products;
			console.log(productsCallResult);
		},
		error: function(jqxhr,textStatus,errorThrown) {
			console.log(jqxhr);
			console.log(textStatus);
			console.log(errorThrown);
			productsCallResult = false;
		}
	});
	processProductsResult(productsCallResult);
}

function processProductsResult(products) {
	if(products) {
		var currentProducts = JSON.parse(app.storage.getItem(STORAGE_PRODUCTS));
		$.each(products, function(index, product) {
			currentProducts.push(product);
		});
		app.storage.setItem(STORAGE_PRODUCTS, JSON.stringify(currentProducts));
	} else {
		//scanFailed();
	}
}

var barcodeResult = readBarcode();
if(barcodeResult != null) {
	getProducts(barcodeResult);
}

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