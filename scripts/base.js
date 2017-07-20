var X,
    Y,
    currentDiv,
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
function addHCEvents() {
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
				addpuMoveEvents(pu);
				loadpuData(boxFinder(e));
				document.getElementById('close').addEventListener('click', function() {
					pu.style.display = 'none';
					up = false;
				});
			}
		}
	});
}
function addpuMoveEvents(pu) {
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
function addBoxesMoveEvents() {
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
	applySize(size);
	fullWidth = getComputedStyle(div).width;
	if (fullWidth[fullWidth.length] == '%') {
		div.style.height = fullWidth; 
	} else {
		div.style.height = calcHeightInpx(new Number(fullWidth[0] + fullWidth[1]));
	}
	div.style.backgroundColor = colors[Math.floor(Math.random()*10)];
	addHCEvents();
	addBoxesMoveEvents();
	document.getElementById('container').appendChild(div);
	randomPos();
	return div;
}
window.addEventListener('load', function() {
	document.getElementsByClassName('horizontal')[0].style.display = 'none';
});
Box('Music I love', '2017/07/14', 'About me', 'l');