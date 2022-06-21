'use strict';
const qs = selector => document.querySelector(selector);
const qsAll = selector => document.querySelectorAll(selector);
const qsRadioLost = selector => qs(`[data-radio-lost="${selector}"]`);
const toggling = (element, cssClass) => element.classList.toggle(cssClass);
const eventInit = (elem, func) => elem.addEventListener('click', func, false);

function initToggle(object) {
	const { key, toggleClass } = object;

	let $toggle = qs(`[data-toggle-main="${key}"]`);
	let $toggleBTN = qs(`[data-toggle-open="${key}"]`);

	eventInit($toggleBTN, () => toggling($toggle, toggleClass));
}

function renderSites(template, sourceElement, targetElement) {
	targetElement.innerHTML = _.template(sourceElement.innerHTML)({
		option: template
	});
}

function ajax(options) {
	let xhr = new XMLHttpRequest();
	xhr.open(options.requestMethod, options.url, true);

	xhr.onload = function() {
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
			// options.error( xhr.status + ': ' + xhr.statusText );

		} else {
			let response = JSON.parse(xhr.responseText);
			options.success(response);
		}
	};

	xhr.onerror = function() {
		console.log(xhr.status + ': ' + xhr.statusText);
		// options.error(xhr.status + ': ' + xhr.statusText);
	};

	xhr.send();
}

const setVisible = element => element.style.display = "";
const setUnvisible = element => element.style.display = "none";
const getItems = () => qsAll('[data-list-item]');
const showAll = callback => getItems().forEach(element => {
	setVisible(element);
	if (callback && typeof callback === "function") callback(element);
});