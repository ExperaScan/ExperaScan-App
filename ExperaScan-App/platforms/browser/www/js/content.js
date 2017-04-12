function championListChampionContainer(champ, realm) {
	return '\
		<div class="championListChampionContainer mdl-js-ripple-effect">\
			<span class="mdl-ripple"></span>\
			<a href="?page=champion&name=' + champ.name + '">\
			<span>' + champ.name + '</span>\
				<img src="' + realm.cdn + '/' + realm.n.champion + '/img/champion/' + champ.image.full + '" />\
			</a>\
		</div>\
	';
}