var _URI = "https://api.darksky.net/forecast/5ce03e4b1a3e548ea542fe0aa4550bf4/";
var _scale = "ºC"
$(function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(res) {
            getCurrentWeather(res.coords);
        }, function(error) {
            console.log(error);
        });
    }

    function getCurrentWeather(coords) {
        var params = coords.latitude + "," + coords.longitude + "?units=si&callback=?";
        $.getJSON(_URI + params, function(res) {
            var temperature = res.currently.temperature.toLocaleString(navigator.language, {maximumFractionDigits: 0});
            temperature += " " + _scale;
            var dom_items_values = {
                description: res.currently.summary,
                temperature: temperature,
                timezone: res.timezone.replace(/_/g, ' ')
            };
            changeTextDOM(dom_items_values);
            setIcon(res.currently.icon);
            setVisible(['.scale-btn', '.weather']);
        });
    }
      
});

function changeTextDOM(dom_items_values) {
    for(let dom_item in dom_items_values) {
        $("#"+dom_item).text(dom_items_values[dom_item]);
    }
}

function setVisible(dom_items) {
    for(let dom_item of dom_items) {
        $(dom_item).css('display','block');
    }
}

function setIcon(icon_name) {
    var icon = new Skycons();
    icon.add("weather-icon", icon_name);
    icon.play();
}

function changeScale() {
    var temperature = $('#temperature').text().split(" ")[0];
    var finalTemperature = 0;
    if(_scale === 'ºC') {
        finalTemperature = (temperature * 1.8) + 32;
        _scale = 'ºF';
    }  else {
        finalTemperature = (temperature - 32) / 1.8;
        _scale = 'ºC';
    }
    finalTemperature = finalTemperature.toLocaleString(navigator.language, {maximumFractionDigits: 0});
    finalTemperature += " " + _scale;
    changeTextDOM({temperature: finalTemperature});
}