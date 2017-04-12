var getUrlParameter = function getUrlParameter(sParam, url = "") {
	if (url == "") {
		var uri = window.location.search;
	} else {
		var uri = url;
	}
	var sPageURL = decodeURIComponent(uri.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

var getUrlParameters = function getUrlParameters(url = "") {
	if (url == "") {
		var uri = window.location.search;
	} else {
		var uri = url;
	}
	var sPageURL = decodeURIComponent(uri.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	var parameters = new Array();

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		var sParameterVal = sParameterName[1] === undefined ? true : sParameterName[1];
		parameters[sParameterName[0]] = sParameterVal;
	}
	return parameters;
};

function loadPage(page, parameters = {}) {
	$('.page-content').load('pages/'+page+'.html', function(responseText, statusText, xhr) {
		pageParameters = getUrlParameters($(this).attr("href"));
		if(statusText == "error") {
			$('.page-content').load('pages/error/404.html');
		}
	});
}