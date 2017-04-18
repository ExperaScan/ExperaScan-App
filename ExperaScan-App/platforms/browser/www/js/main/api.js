var API = {
	// Global variables
	baseUrl: "https://stud.hosted.hr.nl/0894225/Jaar_3/OP3/Preasure_Cooker/api/",
	endpoints: {
		order: "getOrder"
	},

	// Global functions

	getOrder: function(data = {}) {
		var result = this.getFromAPI(this.endpoints.order, data);
		return result;
	},

	getFromAPI: function(endPoint, method = "GET", data = {}) {
		var result = null;
		$.ajax({
			type: method,
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