var API = {
	// Global variables
	baseUrl: "https://stud.hosted.hr.nl/0894225/Jaar_3/OP3/Preasure_Cooker/api/",
	endpoints: {
		difficulties: "getDifficulties",
		exercises: "getExercises",
		initCheck: "getInitCheck",
		POIs: "getPOIs",
		POITypes: "getPOITypes",
		routes: "getRoutes"
	},

	// Global functions

	getDifficulties: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.difficulties, data);
		if (result) {
			app.storage.setItem(STORAGE_DIFFICULTIES, JSON.stringify(result));
		}
		return result;
	},
	getExercises: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.exercises, data);
		if (result) {
			app.storage.setItem(STORAGE_EXERCISES, JSON.stringify(result));
		}
		return result;
	},
	getInitCheck: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.initCheck, data);
		if (result) {
			app.storage.setItem(STORAGE_INITCHECK, JSON.stringify(result));
		}
		return result;
	},
	getPOIs: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.POIs, data);
		if (result) {
			app.storage.setItem(STORAGE_POIS, JSON.stringify(result));
		}
		return result;
	},
	getPOITypes: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.POITypes, data);
		if (result) {
			app.storage.setItem(STORAGE_POITYPES, JSON.stringify(result));
		}
		return result;
	},
	getRoutes: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.routes, data);
		if (result) {
			app.storage.setItem(STORAGE_ROUTES, JSON.stringify(result));
		}
		return result;
	},

	getFromAPI: function(endPoint, data = {}) {
		var result = null;
		$.ajax({
			type: 'GET',
			data: data,
			url: this.baseUrl + endPoint,
			dataType: 'json',
			async: false,
			success: function(jsonData){
				result = jsonData;
			},
			error: function(jqxhr,textStatus,errorThrown) {
				result = false;
			}
		});
		return result;
	}
}