document.addEventListener('DOMContentLoaded', function() {
  var options = {
    strings: [
      "Welcome! Glad to have you here — make yourself at home.",
      "You made it! Not sure how, but welcome anyway.",
      "have fun ^_^"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  };
  var typed = new Typed('#typed-subtitle', options);
});
