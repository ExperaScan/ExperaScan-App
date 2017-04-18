var productsList = JSON.parse(app.storage.getItem(STORAGE_PRODUCTS));
productsList.sort(function(a,b){
	var c = reusableFunctions.date.toDate(a.date);
	var d = reusableFunctions.date.toDate(b.date);
	return c-d;
});

var domToAppend = "";

$.each(productsList, function(productIndex, product) {
	var daysDiff = reusableFunctions.date.daysDifference(product.date);

	var dateClass = "";
	if (daysDiff <= 0) {
		dateClass = "red";
	} else if (daysDiff <= ALMOST_EXPIRATION_DAYS) {
		dateClass = "orange"
	}

	domToAppend += "<div class='product'><div class='productName'>" + product.name + "</div><div class='productDate " + dateClass + "'>" + reusableFunctions.date.formatLocal(product.date) + "</div></div><hr>";
});

if(productsList.length == 0) {
	domToAppend = "Geen producten. Voeg producten toe via het menu.";
}


$(".page-content").append(domToAppend);