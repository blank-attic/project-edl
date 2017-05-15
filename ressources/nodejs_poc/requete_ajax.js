var button1 = document.getElementById('ordre_alphabetique');
var button2 = document.getElementById('bap');
var button3 = document.getElementById('portes_du_20eme');
var button4 = document.getElementById('arrondissement');

var mainHTML = document.getElementsByTagName('main')[0];

window.addEventListener('load', function () {
  var url = 'api';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var p = document.createElement('p');
      p.innerHTML=request.responseText;
      mainHTML.appendChild(p);
    }
  };
  request.open('GET', url, true);
  request.send();
});

button1.addEventListener('click', function(){
  var url = 'api/paad_ordre_alphabetique';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var p = document.createElement('p');
      p.innerHTML=request.responseText;
      mainHTML.appendChild(p);
    }
  };
  request.open('GET', url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  console.log(request);
  request.send();
})

button2.addEventListener('click', function(){
  var url = 'api/paad_bap';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var p = document.createElement('p');
      p.innerHTML=request.responseText;
      mainHTML.appendChild(p);
    }
  };
  request.open('GET', url, true);
  request.send();
})

button3.addEventListener('click', function(){
  var url = 'api/paad_portes_du_20eme';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var p = document.createElement('p');
      p.innerHTML=request.responseText;
      mainHTML.appendChild(p);
    }
  };
  request.open('GET', url, true);
  request.send();
})

button4.addEventListener('click', function(){
  var url = 'api/paad_arrondissement';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var p = document.createElement('p');
      p.innerHTML=request.responseText;
      mainHTML.appendChild(p);
    }
  };
  request.open('GET', url, true);
  request.send();
})
