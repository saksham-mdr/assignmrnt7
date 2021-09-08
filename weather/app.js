let weather = (function() {

    let $ = selector => document.querySelector(selector);
    const searchbox = $(`.search-box`);

    const api = {
        key: "fcc8de7015bbb202209bbf0261babf4c",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    async function getWeather(query) {
        try {
            const result = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            const data = await result.json();

            return displayResults(data);

        } catch (error) {
            console.log(error);
            $(`.alert`).textContent = `Couldn't find "${searchbox.value}"`;
        }
    };

    function displayResults(weather) {
        //console.log(weather);

        $(`.city`).textContent = `${weather.name}, ${weather.sys.country}`;

        $(`.date`).textContent = datetime();

        $(`.temp`).innerHTML = `${parseInt(weather.main.temp)}<span>°c</span>`;

        $(`.weather`).textContent = weather.weather[0].main;

        $(`.hi-low`).textContent = `${parseInt(weather.main.temp_min)}°c / ${parseInt(weather.main.temp_max)}°c`;
    };

    function datetime() {
        let now, year, months, days, date;
        now = new Date();
        year = now.getFullYear();
        date = now.getDate();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();

        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        day = now.getDay();

        return `${days[day]} ${date} ${months[month]} ${year}`;
    };

    const event = function() {
        searchbox.addEventListener('keypress', setQuery);
    };

    function setQuery(evt) {
        if (evt.keyCode == 13 || event.which === 13) {
            getWeather(searchbox.value);

            $(`.alert`).textContent = ``;
        }
    }

    return {
        init: function() {
            console.log('App started...');


            searchbox.focus();

            event();
        }
    };

})();

weather.init();