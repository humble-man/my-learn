
function xuan(obj, num) {
	var isSpeed = 2;
	setInterval(function() {
		isSpeed += num;
		console.log(isSpeed);
		obj.style.transform = 'rotate(' + (isSpeed) + 'deg)';
	}, 30)
}