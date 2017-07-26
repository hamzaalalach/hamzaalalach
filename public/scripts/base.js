var X,
    Y,
    currentDiv,
    currentBox,
    storage = {},
    zIndexs = [],
    moved = false,
    up = false;
document.addEventListener('mousemove', function(e) {
	var target = storage.target;
	moved = true;
	if (target) {
		target.style.top = e.clientY - storage.offsetY + 'px';
		target.style.left = e.clientX - storage.offsetX + 'px';
	}
});
function max(array) {
	var m = array[0],
		arrayL = array.length;
	for (var i = 0; i < arrayL; i++) {
		if (m < array[i]) {
			m = array[i];
		}
	}
	return m
}
function vCenter(elem, parent) {
	var parentHeight = getComputedStyle(parent).height,
			elemHeight = getComputedStyle(elem).height;
	elem.style.top = (parentHeight.substr(0, parentHeight.length - 2) - elemHeight.substr(0, elemHeight.length - 2))/2 + 'px';
}
function boxFinder(e) {
	if (e.target.parentNode.className == 'box') {
		return e.target.parentNode;
	} else if (e.target.parentNode.parentNode.className == 'box') {
		return e.target.parentNode.parentNode;
	}
}
function applySize(s) {
	if (s == 's') {
		currentDiv.style.width = '10%';
		currentDiv.style.fontSize = '0.6em';
		currentDiv.getElementsByClassName('bxDetContainer')[0].style.fontSize = '0.8em';
	} else if (s == 'm') {
		currentDiv.style.width = '15%';
		currentDiv.style.fontSize = '0.75em';
		currentDiv.getElementsByClassName('bxDetContainer')[0].style.fontSize = '0.9em';
	} else if (s == 'l') {
		currentDiv.style.width = '20%';
	}
}
function calcHeightInpx(num) {
	return (window.innerWidth - window.innerWidth*25/100)*num/100 + 'px';
}
function randomPos() {
	currentDiv.style.left = Math.floor(Math.random()*80) + '%';
	currentDiv.style.top = calcHeightInpx(Math.floor(Math.random()*40));
}
function loadpuData(box) {
	document.getElementById('popUpTitle').innerHTML = box.getElementsByClassName('boxTitle')[0].innerHTML;
	document.getElementById('puCategory').innerHTML = box.getElementsByClassName('boxCategory')[0].innerHTML;
	document.getElementById('puDate').innerHTML = box.getElementsByClassName('boxDate')[0].innerHTML;
}
function addBoxesHoverEvent() {
	currentDiv.addEventListener('mouseover', function(e) {
		if (e.target.parentNode.className == 'box') {
			e.target.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'none';
			e.target.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'table-cell';
		} else if (e.target.parentNode.parentNode.className == 'box') {
			e.target.parentNode.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'none';
			e.target.parentNode.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'table-cell';
		}
	});
	currentDiv.addEventListener('mouseout', function(e) {
		if (e.target.parentNode.className == 'box') {
			e.target.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'table-cell';
			e.target.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'none';
		} else if (e.target.parentNode.parentNode.className == 'box') {
			e.target.parentNode.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'table-cell';
			e.target.parentNode.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'none';
		}
	});
}
function addBoxesClickEvent() {
	currentDiv.addEventListener('click', function(e) {
		if (!moved) {
			if (!up) {
				up = true;
				var pu = document.getElementById('popUpContainer');
				pu.style.display = 'flex';
				puWidth = getComputedStyle(pu).width.substr(0, getComputedStyle(pu).width.length - 2);
				puHeight = getComputedStyle(pu).height.substr(0, getComputedStyle(pu).height.length - 2);
				pu.style.left = (window.innerWidth - puWidth - window.innerWidth*25/100)/2 + 'px';
				pu.style.top = (window.innerHeight - puHeight)/2 + 'px';
				pu.style.zIndex = max(zIndexs) + 1 + '';
				zIndexs.push(max(zIndexs) + 1);
				addpuMoveEvent(pu);
				currentBox = boxFinder(e);
				currentBox.style.display = 'none';
				loadpuData(currentBox);
				document.getElementById('close').addEventListener('click', function() {
					pu.style.display = 'none';
					currentBox.style.display = 'table';
					up = false;
				});
			} else {
				currentBox.style.display = 'table';
				currentBox = boxFinder(e);
				currentBox.style.display = 'none';
				loadpuData(currentBox);
			}
		}
	});
}
function addBoxesPhoneCE() {
	currentDiv.addEventListener('click', function(e) {
		up = true;
		var pu = document.getElementById('popUpContainer');
		pu.style.display = 'flex';
		pu.style.position = 'fixed';
		pu.style.width = window.innerWidth + 'px';
		pu.style.height = window.innerHeight + 'px';
		pu.style.top = '0px';
		pu.style.zIndex = '2';
		currentBox = boxFinder(e);
		loadpuData(currentBox);
		document.getElementById('close').addEventListener('click', function() {
			pu.style.display = 'none';
			document.getElementsByTagName('body')[0].className = '';
		});
		document.getElementsByTagName('body')[0].className = 'noscroll';
	});
}
function addpuMoveEvent(pu) {
	pu.addEventListener('mousedown', function(e) {
		var s = storage;
		if (e.target.parentNode.parentNode.parentNode.id == 'popUpContainer') {
			s.target = e.target.parentNode.parentNode.parentNode;
		} else if (e.target.parentNode.parentNode.parentNode.parentNode.id == 'popUpContainer') {
			s.target = e.target.parentNode.parentNode.parentNode.parentNode;
		} else {
			s.target = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
		}
		s.offsetX = e.clientX - s.target.offsetLeft;
		s.offsetY = e.clientY - s.target.offsetTop;
		if (zIndexs.length == 0) {
			s.target.style.zIndex = getComputedStyle(s.target).zIndex + 1;
			zIndexs.push(1);
		} else if (getComputedStyle(s.target).zIndex < max(zIndexs)) {
			s.target.style.zIndex = max(zIndexs) + 1;
			zIndexs.push(new Number(getComputedStyle(s.target).zIndex));
		}
	});
	pu.addEventListener('mouseup', function() {
		storage = {};
	});
}
function addBoxesMoveEvent() {
	currentDiv.addEventListener('mousedown', function(e) {
		var s = storage;
		moved = false;
		s.target = boxFinder(e);
		s.offsetX = e.clientX - s.target.offsetLeft;
		s.offsetY = e.clientY - s.target.offsetTop;
		if (zIndexs.length == 0) {
			s.target.style.zIndex = getComputedStyle(s.target).zIndex + 1;
			zIndexs.push(1);
		} else if (getComputedStyle(s.target).zIndex < max(zIndexs)) {
			s.target.style.zIndex = max(zIndexs) + 1;
			zIndexs.push(new Number(getComputedStyle(s.target).zIndex));
		}
	});
	currentDiv.addEventListener('mouseup', function() {
		storage = {};
	});
}
function Box(title, date, categ, size) {
	var colors = ['#00FFFF', '#1560FB', '#000', '#FFB90F', '#00EE00', '#FF6A6A', '#AB82FF', '#FFEC8B', '#FF8247', '#9ACD32'],
		div = document.createElement('div'),
		h1 = document.createElement('h1'),
		p1 = document.createElement('p'),
		p2 = document.createElement('p'),
		h21 = document.createElement('h2'),
		h22 = document.createElement('h2'),
		div0 = document.createElement('div');
	div.className = 'box';
	h1.className = 'boxTitle';
	p2.className = 'boxDetails boxDate';
	p1.className = 'boxDetails boxCategory';
	h21.className = 'boxHeader';
	h22.className = 'boxHeader';
	div0.className = 'bxDetContainer';
	h1.innerHTML = title;
	p2.innerHTML = date;
	p1.innerHTML = categ;
	h21.innerHTML = 'Category:';
	h22.innerHTML = 'Added:';
	div0.appendChild(h21);
	div0.appendChild(p1);
	div0.appendChild(h22);
	div0.appendChild(p2);
	div.appendChild(h1);
	div.appendChild(div0);
	div.setAttribute('data-category', categ);
	currentDiv = div;
	div.style.backgroundColor = colors[Math.floor(Math.random()*10)];
	if (window.innerWidth > 700) {
		applySize(size);
		fullWidth = getComputedStyle(div).width;
		if (fullWidth[fullWidth.length] == '%') {
			div.style.height = fullWidth; 
		} else {
			div.style.height = calcHeightInpx(new Number(fullWidth[0] + fullWidth[1]));
		}
	}
	document.getElementById('container').appendChild(div);
	if (window.innerWidth > 700) {
		addBoxesClickEvent();
		addBoxesMoveEvent();
		randomPos();
	}
	if (window.innerWidth <= 700) {
		vCenter(h1, div);
		vCenter(div0, div);
		addBoxesPhoneCE();
	}
	return div;
}
window.addEventListener('load', function() {
	document.getElementsByClassName('horizontal')[0].style.display = 'none';
	document.getElementById('arrow').addEventListener('click', function(e) {
		e.preventDefault();
		$('#container').animatescroll({
 		 'scrollSpeed': 2000,
 		 'easing' :'easeOutBounce'
		});
	});
});
(function() {
	var navBtns = [
		document.getElementById('navAll'),
		document.getElementById('navAboutMe'),
		document.getElementById('navPortfolio'),
		document.getElementById('navBlog'),
		],
		navBtnsL = navBtns.length;
	for (var i = 0; i < navBtnsL; i++) {
		navBtns[i].addEventListener('click', function(e) {
			document.getElementsByClassName('active')[0].className = '';
			e.target.className = 'active';
			var newCateg = e.target.innerHTML.toLowerCase(),
				boxes = document.getElementsByClassName('box'),
				boxesL = boxes.length;
			if (newCateg == 'display all') {
				for (var i = 0; i < boxesL; i++) {
					boxes[i].style.display = 'table';
				}
			} else {
				for (var i = 0; i < boxesL; i++) {
					if (boxes[i].getAttribute('data-category').toLowerCase() != newCateg) {
						boxes[i].style.display = 'none';
					} else {
						boxes[i].style.display = 'table';
					}
				}
			}
		});
	}
})();
Box('Music I love', '2017/07/14', 'about me', 'l');
Box('Upload files using nodeJS', '2017/07/14', 'blog', 'l')
Box('Todo app', '2017/07/14', 'portfolio', 'l')
Box('Music I love', '2017/07/14', 'about me', 'l');
Box('Upload files using nodeJS', '2017/07/14', 'blog', 'l')
Box('Todo app', '2017/07/14', 'portfolio', 'l')
Box('Music I love', '2017/07/14', 'about me', 'l');
Box('Upload files using nodeJS', '2017/07/14', 'blog', 'l')
Box('Todo app', '2017/07/14', 'portfolio', 'l')
Box('Music I love', '2017/07/14', 'about me', 'l');
Box('Upload files using nodeJS', '2017/07/14', 'blog', 'l')
Box('Todo app', '2017/07/14', 'portfolio', 'l')