var reusableFunctions = {
	date: {
		formatLocal: function(unformattedDate) {
			return unformattedDate.split("-").reverse().join("-");
		},

		toDate: function(d1) {
			var d1s = d1.split("-");
			return new Date(d1s[0], d1s[1] - 1, d1s[2]);
		},

		daysDifference: function(d1, d2 = null) {
			var d1s = d1.split("-");
			var date1 = new Date(d1s[0], d1s[1] - 1, d1s[2]);

			if (d2 != null) {
				var d2s = d2.split("-");
				var date2 = new Date(d2s[0], d2s[1] - 1, d2s[2]);
			} else {
				var date2 = new Date();
			}
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			return diffDays;
		}
	},

	getObjectOfArrayByParameter: function(array, val, idParam = "id") {
		var returnObject = {};
		$.each(array, function(index, object) {
			if(object[idParam] == val) {
				returnObject = object;
			}
		});
		return returnObject;
	},

	getObjectsOfArrayByParameter: function(array, val, idParam = "id") {
		var returnArray = [];
		$.each(array, function(index, object) {
			if(object[idParam] == val) {
				returnArray.push(object);
			}
		});
		return returnArray;
	}
}