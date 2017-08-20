var up = false,
		upBy = '',
		edited = false;
function XHR() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhr;
}
function menuOptions() {
	document.getElementById('navShow').addEventListener('click', menuOptionsFunc);
	document.getElementById('navRemove').addEventListener('click', navRemoveFunc);
	document.getElementById('navEdit').addEventListener('click', navEditFunc);
}
function navEditFunc() {
	edited = true;
	editedElem = document.getElementById(upBy);
	document.getElementById('menu').style.display = 'none';
	up = false;
	document.getElementById('title').value = editedElem.querySelector('#sTitle').innerHTML;
	document.getElementById('content').value = editedElem.querySelector('#sContent').innerHTML;
	var size = editedElem.querySelector('#sSize').innerHTML;
	if (size == 'Large') {
		document.getElementById('size')[3].selected = true;
	} else if (size == 'Medium') {
		document.getElementById('size')[2].selected = true;
	} else {
		document.getElementById('size')[1].selected = true;
	}
	var category = editedElem.querySelector('#sCateg').innerHTML;
	if (category == 'about me') {
		document.getElementById('category')[1].selected = true;
	} else if (category == 'portfolio') {
		document.getElementById('category')[3].selected = true;
	} else {
		document.getElementById('category')[2].selected = true;
	}
	document.getElementById('navEdit').removeEventListener('click', navEditFunc);
}
function menuOptionsFunc() {
	var pu = document.getElementById('puContainer');
	pu.style.display = 'flex';
	document.getElementById('menu').style.display = 'none';
	up = false;
	puWidth = getComputedStyle(pu).width.substr(0, getComputedStyle(pu).width.length - 2);
	puHeight = getComputedStyle(pu).height.substr(0, getComputedStyle(pu).height.length - 2);
	pu.style.left = (window.innerWidth - puWidth - window.innerWidth*50/100)/2 + 'px';
	pu.style.top = (window.innerHeight - puHeight)/2 + 'px';
	document.getElementById('mainContent').innerHTML = document.getElementById(upBy).querySelector('#sContent').innerHTML;
	document.getElementById('close').addEventListener('click', function() {
		pu.style.display = 'none';
		document.getElementById('navRemove').removeEventListener('click', navRemoveFunc);
	});
}
function navRemoveFunc() {
	var xhr = XHR();
	xhr.open('POST', '/boss/removeStory/' + upBy);
	xhr.send();
	document.getElementById('menu').style.display = 'none';
	up = false;
	var elem = document.getElementById(upBy);
	elem.parentNode.removeChild(elem);
	var nOfStories = document.getElementById('storiesL');
	nOfStories.innerHTML = '  ' + (new Number(nOfStories.innerHTML) - 1);
	document.getElementById('navRemove').removeEventListener('click', navRemoveFunc);
}
function menuClickEv(e) {
	var menu = document.getElementById('menu');
	if (!up) {
		up = true;
		upBy = e.target.parentNode.id;
		menu.style.display = 'flex';
		menu.style.zIndex = '100';
		menu.style.top = e.clientY + 15 + 'px';
		menuOptions(upBy);
	} else {
		if (e.target.parentNode.id == upBy) {
			menu.style.display = 'none';
			up = false;
			upBy = '';
		} else {
			upBy = e.target.parentNode.id;
			menu.style.display = 'flex';
			menu.style.zIndex = '100';
			menu.style.top = e.clientY + 15 + 'px';
			menuOptions(upBy);
		}
	}
}
function newRow(data) {
	var div = document.createElement('div'),
			span = document.createElement('span'),
			p1 = document.createElement('p'),
			p2 = document.createElement('p'),
			p3 = document.createElement('p'),
			p4 = document.createElement('p'),
			p5 = document.createElement('p');
	div.className = 'editionContainer';
	div.id = data[0]._id;
	span.className = 'fa fa-ellipsis-v menuBtn';
	span.setAttribute('aria-hidden', 'true');
	p1.id = 'sTitle';
	p1.innerHTML = data[0].title;
	p2.id = 'sDate';
	p2.innerHTML = data[0].date;
	p3.id = 'sSize';
	if (data[0].size == 'l') {
		data[0].size = 'Large';
	} else if (data[0].size == 'm') {
		data[0].size = 'Medium';
	} else {
		data[0].size = 'Small';
	}
	p3.innerHTML = data[0].size;
	p4.id = 'sCateg';
	p4.innerHTML = data[0].category;
	p5.id = 'sContent';
	p5.innerHTML = data[0].content;
	div.appendChild(span);
	div.appendChild(p1);
	div.appendChild(p2);
	div.appendChild(p3);
	div.appendChild(p4);
	div.appendChild(p5);
	document.getElementById('right').appendChild(div);
	var nOfStories = document.getElementById('storiesL');
	nOfStories.innerHTML = '  ' + (new Number(nOfStories.innerHTML) + 1);
	span.addEventListener('click', function(e) {
		menuClickEv(e);
	});
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
						elem.value = '';
          } else {
            data += elem.value + '/';
						elem.value = '';
          }
          showNextElem(elem);
        }
      });
    }
    if (elems.indexOf(elem) == 1 || elems.indexOf(elem) == 2) {
      elem.addEventListener('change', function(e) {
        if (elem[elem.selectedIndex].value != "0") {
          data += elem[elem.selectedIndex].value + '/';
					elem[0].selected = true;
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
		if (edited) {
			xhr.open('POST', '/boss/updateStory/' + upBy + '/' + data);
			document.getElementById(upBy).parentNode.removeChild(document.getElementById(upBy));
			edited = false;
		} else {
    	xhr.open('POST', '/boss/newStory/' + data);
		}
    xhr.send();
    document.getElementById('cancelPost').click();
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
        newRow(JSON.parse(this.responseText));
      }
    });
  });
})();

/*	handle menu  */
(function() {
var menus = document.getElementsByClassName('menuBtn'),
		menusL = menus.length - 1;
	menus[0].style.visibility = 'hidden';
	for (var i = 0; i < menusL; i++) {
		menus[i+1].addEventListener('click', function(e) {
			menuClickEv(e);
		});
	}
})();
