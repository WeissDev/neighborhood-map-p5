function getWiki(title) {
    'use strict';
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json&callback=wikiCallback';

	var wikiRequestTimeout = setTimeout(function (){
        $('#wiki-elem').text("failed to get wikipedia resources");
    }, 8000);

    $.ajax( {
        method: 'GET',
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                fullUrl = 'http://en.wikipedia.org/wiki/' + articleStr;
               $('#wiki-elem').html('<img src="img/wiki-icon.png" alt="Wiki Icon"><a href="' + fullUrl + '">' + articleStr + '</a>');
            }
        clearTimeout(wikiRequestTimeout);
        }
    });
}

function getWeather() {
    'use strict';
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?id=2657896&APPID=44d1e8b52c6f16e94976ca04871c8382';

    $.ajax( {
        method: 'GET',
        url: weatherUrl,
        dataType: 'jsonp',
        success: function(data) {
            /** Convert Kelvin to °C by subtracting 273.15 */
            var temp = data.main.temp - 273.15;

            /** Get sunrise/sunset time
             * Converts it into a more "readable" Hour/Minutes format
             */
            function getSunshine(timestamp) {
                var timeValue = new Date(timestamp * 1000);
                var hourFormat = timeValue.getHours() + ':' + timeValue.getMinutes();
                return hourFormat;
            }

            /** Concatenates all the data into a readable format */
            weatherString = '<h3>Today\'s weather in ' + data.name + ', ' + data.sys.country +'</h3>' +
                            '<h3><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" class="weather">' +
                            data.weather[0].main + ', ' + (Math.round(temp * 10) / 10) + ' °C</h3>' +
                            '<p>' + data.weather[0].description + ' today!</p>' +
                            '<table style="width: 250px;">' +
                            '<tr>' +
                                '<td>Pressure</td>' +
                                '<td> ' + data.main.pressure + ' hPa</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Humidity</td>' +
                                '<td> ' + data.main.humidity + '%</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Sunrise</td>' +
                                '<td> ' + getSunshine(data.sys.sunrise) + '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Sunset</td>' +
                                '<td> ' + getSunshine(data.sys.sunset) + '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Wind</td>' +
                                '<td> ' + data.wind.speed + ' m/s</td>' +
                            '</tr>' +
                            '</table>' +
                            '<p class="weather-copyright">&copy; openweathermap.org</p>';
            /** Appends weather content to div#weather-container */
            $('#weather-container').html(weatherString);
        },
        error: function() {
            $('#weather-container').html('<h3>Weather data is currently unavailable.</h3>');
        }
    });
}

getWeather();