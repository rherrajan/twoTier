function checkStatus(){

	var statusURL = createBackendURL("systeminfo");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if(this.status == 200){
				document.querySelector('#analyzer-status').setAttribute('class', 'led-green');
			} else {
				document.querySelector('#analyzer-status').setAttribute('class', 'led-red');
			}
		};
	}

	xhttp.open("GET", statusURL, true);
	xhttp.send();

}