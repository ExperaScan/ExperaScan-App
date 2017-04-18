var productsList = JSON.parse(app.storage.getItem(STORAGE_PRODUCTS));
console.log(productsList);
var domToAppend = "";

$.each(productsList, function(productIndex, product) {
	domToAppend += "<div class='product'><div class='productName'></div><div class='productDate'></div></div>";
});


$(".page-content").append(domToAppend);