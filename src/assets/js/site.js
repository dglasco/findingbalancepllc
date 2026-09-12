// No framework here on purpose: two small behaviours, no build step, no tracking.
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    // The nav is visible by default so it still works with JS disabled.
    if (window.matchMedia('(max-width: 55.99rem)').matches) {
      nav.setAttribute('data-open', 'false');
    }
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') !== 'true';
      nav.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  var settle = document.querySelector('.settle');
  if (settle) {
    var button = settle.querySelector('button');
    var label = settle.querySelector('.settle__ring span');
    var phases = [
      { text: 'breathe in', ms: 4000 },
      { text: 'hold', ms: 2000 },
      { text: 'breathe out', ms: 6000 }
    ];
    var timer = null;
    var step = 0;

    function advance() {
      label.textContent = phases[step].text;
      timer = window.setTimeout(function () {
        step = (step + 1) % phases.length;
        advance();
      }, phases[step].ms);
    }

    function stop() {
      window.clearTimeout(timer);
      timer = null;
      step = 0;
      settle.setAttribute('data-running', 'false');
      label.textContent = 'one minute';
      button.textContent = 'Start';
    }

    button.addEventListener('click', function () {
      if (timer) { stop(); return; }
      settle.setAttribute('data-running', 'true');
      button.textContent = 'Stop';
      advance();
    });
  }
})();
