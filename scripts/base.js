var X,
    Y,
    currentDiv;
function move(e) {
	currentDiv.style.left = e.clientX - X + 'px';
	currentDiv.style.top = e.clientY - Y + 'px';
}
/* Box model */
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
function addEvents() {
	currentDiv.addEventListener('mouseover', function(e) {
		if (e.target.parentNode.className == 'box') {
			e.target.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'none';
			e.target.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'table-cell';
		} else if (e.target.parentNode.parentNode.className == 'box') {
			e.target.parentNode.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'none';
			e.target.parentNode.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'table-cell';
		}
	}, true);
	currentDiv.addEventListener('mouseout', function(e) {
		if (e.target.parentNode.className == 'box') {
			e.target.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'table-cell';
			e.target.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'none';
		} else if (e.target.parentNode.parentNode.className == 'box') {
			e.target.parentNode.parentNode.getElementsByClassName('boxTitle')[0].style.display = 'table-cell';
			e.target.parentNode.parentNode.getElementsByClassName('bxDetContainer')[0].style.display = 'none';
		}
	}, true);
	currentDiv.addEventListener('mousedown', function(e) {
		X = e.clientX - currentDiv.offsetLeft;
		Y = e.clientY - currentDiv.offsetTop;
		currentDiv.addEventListener('mousemove', move, false);
	}, false);
	currentDiv.addEventListener('mouseup', function() {
		currentDiv.removeEventListener('mousemove', move, false);
		X = 0;
		Y = 0;
	}, false);
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
	p2.className = 'boxDetails';
	p1.className = 'boxDetails';
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
	currentDiv = div;
	applySize(size);
	fullWidth = getComputedStyle(div).width;
	if (fullWidth[fullWidth.length] == '%') {
		div.style.height = fullWidth; 
	} else {
		divWidth = new Number(fullWidth[0] + fullWidth[1])
		div.style.height = (window.innerWidth - window.innerWidth*25/100)*divWidth/100 + 'px';
	}
	div.style.backgroundColor = colors[Math.floor(Math.random()*10)];
	addEvents();
	document.getElementById('container').appendChild(div);
	return div;
}