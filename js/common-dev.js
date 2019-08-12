;(function() {
  'use strict';

  /*
  ███████  ██████   ██████  ███    ███
     ███  ██    ██ ██    ██ ████  ████
    ███   ██    ██ ██    ██ ██ ████ ██
   ███    ██    ██ ██    ██ ██  ██  ██
  ███████  ██████   ██████  ██      ██
  */

  // INIT
  // let html    = document.querySelector('html');
  // let minus   = document.querySelector('.js-font__minus');
  // let normal  = document.querySelector('.js-font__normal');
  // let plus    = document.querySelector('.js-font__plus');
  //
  // minus.addEventListener('click', onMinus, false);
  // normal.addEventListener('click', onNormal, false);
  // plus.addEventListener('click', onPlus, false);


  // FUNC
  function onMinus() {
    let paramNow = parseInt(getComputedStyle(html).fontSize);
    html.style.fontSize = paramNow - 1 + 'px';
  }
  function onNormal() {
    html.style.fontSize = '16px';
  }
  function onPlus() {
    let paramNow = parseInt(getComputedStyle(html).fontSize);
    html.style.fontSize = paramNow + 1 + 'px';
  }



  /*
  ████████  ██████   ██████   ██████  ██      ███████
     ██    ██    ██ ██       ██       ██      ██
     ██    ██    ██ ██   ███ ██   ███ ██      █████
     ██    ██    ██ ██    ██ ██    ██ ██      ██
     ██     ██████   ██████   ██████  ███████ ███████
  */

  // INIT Logo
  initToggle({
    toggle: 'logo',
    toggleBTN: 'logo',
    toggleClass: 'js-social--active'
  });

  // INIT Grid
  initToggle({
    toggle: 'grid',
    toggleBTN: 'grid',
    toggleClass: 'js-like-list--active'
  });


  //  FUNC
  function initToggle(object) {
    'use strict';

    let toggle      = document.querySelector('[data-toggle-main="'+object.toggle+'"]');
    let toggleBTN   = document.querySelector('[data-toggle-open="'+object.toggleBTN+'"]');
    let toggleClass = object.toggleClass;

    eventInit(toggleBTN, toggling);

    function toggling(e) {
      toggle.classList.toggle(toggleClass);
    }

    function eventInit(elem, func) {
      elem.addEventListener('click', func, false);
    }
  }



  /*
  ███████ ██ ████████ ███████ ███████
  ██      ██    ██    ██      ██
  ███████ ██    ██    █████   ███████
       ██ ██    ██    ██           ██
  ███████ ██    ██    ███████ ███████
  */

  // INIT
  let templateElem = document.querySelector(`.js-template__sites`);

  ajax({
    requestMethod: 'GET',
    url: './json/sites.json',
    success: renderSites.bind(this)
  });


  // FUNC
  function renderSites(template) {
    let elem = document.getElementById('templateSites').innerHTML;
    templateElem.innerHTML = _.template(elem)({
      option: template
    });
  }



  /*
  ██   ██ ██   ██ ██████
   ██ ██  ██   ██ ██   ██
    ███   ███████ ██████
   ██ ██  ██   ██ ██   ██
  ██   ██ ██   ██ ██   ██
  */

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

})(window);
