function getFreeToPlay () {
	$("#freeRotationContainer").html('<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" id="freeRotationLoadingSpinner"></div>');
	componentHandler.upgradeElement($("#freeRotationLoadingSpinner")[0]);
	$.ajax({
		dataType: "json",
		url: apiUrl + "api/freeToPlay.php",
		success: processFreeToPlay,
		error: freeToPlayError
	});
}

function processFreeToPlay(data) {
	var freeToPlayIds = "";

	$.each(data, function(index, el) {
		if (index > 0) {
			freeToPlayIds += ',';
		}
		freeToPlayIds += el.id;
	});

	if(data.length == 0) {
		html = notFoundError;
	}

	getFreeToPlayChampions(freeToPlayIds);
}

function getFreeToPlayChampions(ids) {
	$.ajax({
		dataType: "json",
		url: apiUrl + "api/staticDataChampions.php",
		data: {
			ids: ids
		},
		success: processFreeToPlayChampions,
		error: freeToPlayError
	});
}

function processFreeToPlayChampions(data) {
	console.log(data);
	realm = data.realms;
	var html = '';

	$.each(data.data, function(index, champ) {
		html += championListChampionContainer(champ.data, realm);
	});

	if(data.data.length == 0) {
		html = notFoundError;
	}

	$("#freeRotationContainer").html(html);

	$.each($(".championListChampionContainer"), function(index, el) {
		componentHandler.upgradeElement($(el)[0]);
	});
}

function freeToPlayError() {
	$("#freeRotationContainer").html(retreivingDataError);
}

getFreeToPlay();