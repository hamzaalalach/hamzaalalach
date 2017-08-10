function XHR() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhr;
}
/*  new post */
(function() {
  var data = '',
      elems = [document.getElementById('title'), document.getElementById('category'),
               document.getElementById('size'), document.getElementById('content'),
               document.getElementById('postOptions')],
      nextElem;
  function centerV(elem) {
    var elemHeight = getComputedStyle(elem).height,
        height = elemHeight.substr(0, elemHeight.length - 2);
    elem.style.top = ((window.innerHeight - 40*window.innerHeight/100) - height) / 2 + 'px';
  }
  function showNextElem(elem) {
    elem.style.display = 'none';
    if (elems.indexOf(elem) + 1 < elems.length) {
      nextElem = elems[elems.indexOf(elem) + 1];
      nextElem.style.display = 'flex';
      nextElem.style.margin = 'auto';
      centerV(nextElem);
      addEvents(nextElem);
    }
  }
  function addEvents(elem) {
    if (elems.indexOf(elem) == 0 || elems.indexOf(elem) == 3) {
      elem.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
          if (elems.indexOf(elem) == 3) {
            data += elem.value;
          } else {
            data += elem.value + '/';
          }
          showNextElem(elem);
        }
      });
    }
    if (elems.indexOf(elem) == 1 || elems.indexOf(elem) == 2) {
      elem.addEventListener('change', function(e) {
        if (elem[elem.selectedIndex].value != "0") {
          data += elem[elem.selectedIndex].value + '/';
          showNextElem(elem);
        }
      });
    }
  }
  centerV(document.getElementById('title'));
  addEvents(elems[0]);
  document.getElementById('cancelPost').addEventListener('click', function() {
    elems[4].style.display = 'none';
    elems[0].style.display = 'flex';
    elems[0].style.margin = 'auto';
    data = '';
  });
  document.getElementById('postBtn').addEventListener('click', function() {
    var xhr = XHR();
    xhr.open('POST', '/boss/newpost/' + data);
    xhr.send();
    elems[0].value = '';
    elems[3].value = '';
    document.getElementById('cancelPost').click();
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
      }
    });
  });
})();
