window.onload = function() {
	var button = document.getElementById('addElem');
	var ulList = document.getElementById('list');
	button.addEventListener('click', function(e) {
		var ulLiElements = ulList.getElementsByTagName('li');
		var liCount = ulLiElements.length;
		var newLi = document.createElement('li');
		newLi.innerHTML = "item " + liCount;
		ulList.appendChild(newLi);
	})
}
