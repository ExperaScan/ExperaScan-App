function array_contains(search, arr) {
    search = search.toLocaleLowerCase();
    return jQuery.inArray(true, jQuery.map(arr, function(s) {
        return s.toLocaleLowerCase().indexOf(search) > -1;
    }))
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var homeUrl = window.location.href.split('?')[0];
homeUrl = homeUrl.replace(/\/?$/, '/');
apiUrl = "http://lolhelper.mennovandenende.nl/";

var pageParameters = new Array();