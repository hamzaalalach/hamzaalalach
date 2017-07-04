/* Move spinner */
var spinner = document.getElementById('spinner'),
    X,
    Y,
    spinHov;
spinner.addEventListener('mousedown', function(e) {
	spinHov = true;
	X = e.clientX - spinner.offsetLeft;
	Y = e.clientY - spinner.offsetTop;
	spinner.addEventListener('mousemove', move, false);
}, false);
spinner.addEventListener('mouseup', function() {
	spinHov = false;
	center('spinner', 5);
	spinner.removeEventListener('mousemove', move, false);
	X = 0;
	Y = 0;
}, false);
function move(e) {
	spinner.style.left = e.clientX - X + 'px';
	spinner.style.top = e.clientY - Y + 'px';
}