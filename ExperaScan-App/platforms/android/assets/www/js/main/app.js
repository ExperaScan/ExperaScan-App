var app = {
	// Global variables
	storage: window.localStorage,
	backgroundTimer: null,

	// Startup functions
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function() {
		this.receivedEvent('deviceready');
	},

	receivedEvent: function(id) {
		var products = app.storage.getItem(STORAGE_PRODUCTS);
		if(products == null) {
			app.storage.setItem(STORAGE_PRODUCTS, "[]");
		}

		var page = getUrlParameter('page');
		if (typeof page == 'undefined') {
			page = 'home';
		}
		loadPage(page);

		document.addEventListener("backbutton", this.close, false);
	},

	close: function() {
		navigator.app.exitApp();
	}
};

app.initialize();