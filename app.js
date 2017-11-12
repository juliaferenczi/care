/*Get APIKey from www.openweathermap.org */
var api_key = 'bc7e92fd0a59291993e26005a28fd786';
var unit = "metric";
var unit_symbol = "&#8451;";
var city;

/* Page download */
function init() {
	document.getElementById("weatherResponse").appendChild(
			getTemp("Berlin", unit));
	document.getElementById("weatherResponse").appendChild(
			getTemp("Waltham", unit));
}

/*  */
function updateCity() {
	city = document.getElementById("cityName").value;
	document.getElementById("cityUpdateResponse").innerHTML = "";
	document.getElementById("cityName").value = "";
	document.getElementById("cityUpdateResponse").appendChild(getTemp(city, unit));
}

/* This function not in work! */
function updateUnit(unitName) {
	unit = unitName;
	if (city == undefined || city == "") {
		init();
	} else {
		getTemp(city, unit);
	}
}

/* Call openweathermap.org api */
function getTemp(city, unit) {

	var result;
	var helper = document.createElement('div');

	$.ajax({
		type : 'POST',
		url : 'http://api.openweathermap.org/data/2.5/weather?q=' + city
				+ '&units=' + unit + '&appid=' + api_key,
		async : false,
		dataType : 'json',
		success : function(data) {
			var r = Math.round(data.main.temp);
			helper.innerHTML = "<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>";
			helper.innerHTML += data.name + " " + r + unit_symbol;
			if(r <= 0){
				helper.innerHTML += "<i class='fa fa-snowflake-o'></i>";
			}else if(r > 35){
				helper.innerHTML += "<i class='fa fa-sun-o'></i>";
			}else{
				helper.innerHTML += "<i class='fa fa-thermometer-half'></i>";
			}
			result = helper;
		},
		error : function(xhr, status, errorThrown) {
			helper.style.color = "#424242";
			helper.innerHTML = errorThrown;
			result = helper;
		}
	});

	return result;
}

/* Textbox enter  */
$(document).ready(function(){
    $("#cityName").keypress(function(e){
        var charCode = e.which || e.keyCode;
    	if ( charCode == '13' ) {
    	      $("#btnCity").click();
    	    }
    });
});