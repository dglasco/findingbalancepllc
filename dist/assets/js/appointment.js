/* Appointment request. The site is static and has no backend, and posting a
   counseling enquiry to a third-party form service is the wrong default, so the
   form composes a mailto: in the visitor's own mail app instead. Nothing is sent
   from this page and nothing is stored. Without JavaScript the form still
   renders and the page offers a plain mailto link beside it. */
(function () {
  "use strict";
  var form = document.querySelector("[data-request]");
  if (!form) return;
  var hint = form.querySelector("[data-request-hint]");
  var to = form.querySelector('a[href^="mailto:"]');
  var address = to ? to.getAttribute("href").slice(7) : "";
  if (!address) return;

  function val(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!val("name") || !val("email")) {
      if (hint) hint.textContent = "Your name and email are needed so Reem can reply.";
      (form.elements[val("name") ? "email" : "name"]).focus();
      return;
    }
    var lines = [
      "Name: " + val("name"),
      "Email: " + val("email"),
      val("phone") ? "Phone: " + val("phone") : "",
      "Looking for: " + val("service"),
      val("where") ? "Where in Texas: " + val("where") : "",
      val("when") ? "Times that work: " + val("when") : "",
      val("about") ? "\nWhat brings me here:\n" + val("about") : ""
    ].filter(Boolean);

    var subject = "Appointment request: " + val("service");
    var href = "mailto:" + address +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));

    if (hint) hint.textContent = "Opening your email app. Nothing has been sent until you send it.";
    window.location.href = href;
  });
})();
