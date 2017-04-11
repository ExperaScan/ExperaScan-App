$( document ).ready(function() {
	// $(".mdl-navigation__link").click(function(event) {
	// 	event.preventDefault();
	// 	loadPage(getUrlParameter('page', $(this).attr("href")));
	// 	$(".mdl-layout__obfuscator").trigger('click');
	// });

	var page = getUrlParameter('page');
	if (typeof page == 'undefined') {
		page = 'home';
	}
	loadPage(page);

});

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

function addSubNavClickHandler() {
	$(".subNavItem").click(function(event) {
		event.preventDefault();
		var tabToShow = $(this).attr("href");
		$(".pageTab").addClass('hidden');
		$(tabToShow).removeClass('hidden');
		$(".subNavItem").css('border-bottom', 'none');
		$(this).css('border-bottom', '2px solid var(--second-color)');
	});
}

function addSubNav(navItems) {
	var html = '';
	html += '<nav class="subNav subNavPage">';

	var i = 1;
	$.each(navItems, function(idToLink, LinkText) {
		var clicked = '';
		if (i == 1) {
			clicked = ' style="border-bottom: 2px solid var(--second-color);"';
		}
		html += '<a' + clicked + ' class="subNavItem mdl-js-ripple-effect" href="#' + idToLink + '">' + LinkText + '</a>';
		i++;
	});

	html += '</nav>';

	$.each(navItems, function(idToLink, LinkText) {
		html += '<section id="' + idToLink + '" class="pageTab"></section>';
	});

	return html;
}