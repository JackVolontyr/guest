window.onload = function() {
	'use strict';

	/* Initial Logo */
	initToggle({
		key: 'logo',
		toggleClass: 'js-social--active'
	});

	/* Initial Grid */
	initToggle({
		key: 'grid',
		toggleClass: 'js-like-list--active'
	});

	/* Sites List */
	ajax({
		requestMethod: 'GET',
		url: './json/sites.json',
		success: template => renderSites(
			template,
			document.getElementById('templateSites'),
			qs('[data-template-target]')
		)
	});

	/* Radio Filter */
	eventInit(qsRadioLost('seeAll'), showAll);

	eventInit(qsRadioLost('seeExists'), () => showAll(element => { 
		if (element.dataset.listItem === "lost") setUnvisible(element); 
	}));

	eventInit(qsRadioLost('seeLost'), () => showAll(element => { 
		if (element.dataset.listItem !== "lost") setUnvisible(element);
	}));
}