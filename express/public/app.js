"use strict";

function displayCard(src, name) {
	var card = '<div class="card"> \
		<img src="img_src"> \
		<p class="product-name">product_name</p> \
		<button class="to-cart">add to cart</button> \
		</div>';
	
	var re = card.replace('img_src', src);
	re = re.replace('product_name', name);
	$('.goods').append(re);
}

function sendJson() {
	var number = {n: 445, p: 784};
	var xhr = new window.XMLHttpRequest();
	xhr.open('POST', '/cart', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(number));
}

function getData() {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", '/data', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	console.log(xhr.response);
			//dbArray = JSON.parse(xhr.response);
        }
    };
    try { xhr.send(); } catch (err) {console.log(err) }
	
}

var main = function() {	
	for(var i = 0; i < 3; i ++) {
		displayCard('img/burger_0.jpg', 'Burger sushi style');
	}
	for(var i = 0; i < 3; i ++) {
		displayCard('img/borshch_0.png', 'Fantastic borshch');
	}
	getData();
	sendJson();
}

$(document).ready(main);
