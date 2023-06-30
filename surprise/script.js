function g(a, n) {
  var divs = "";
  for (var s = 0; s < 50; s++) {
    divs += '<div class="div ball"  id="' + getRandom() + '"></div>';
  }
  document.getElementById(a).innerHTML += divs;
}
g('h1');
g('h3');

function f(x, n, a) {
  var t = 0;
  setInterval(function() {
    if (t < 50) {
      x.style.bottom = (46 * t * n - t * t) + 20 + 'px';
      x.style.height = 10 - t / 4.6 + 'px';
      x.style.width = 10 - t / 4.6 + 'px';
      if (t > 15) {
        x.style.left = (a * t + 150) + 'px';
        x.style.bottom = (46 * t * n * n - t * t) + 20 + 'px';
      }
      t += 1.3
    }
  }, 50)
}

function Launch() {
  if ($('.revealleft,.revealright').hasClass('revealed')) {
    var i;
    for (i = 0; i < 150; i++) {
      var x = document.getElementsByClassName('div')[i];
      var a = parseInt(x.id);
      x.style.left = '150px';
      f(x, 1 + ((Math.random() * 5) + 1) / 100, a)
    }
  }
}

function getRandom() {
  return Math.random() * 10 - 5
}