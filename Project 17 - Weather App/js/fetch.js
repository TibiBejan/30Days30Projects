class Fetch {
    async getDataByCoords(input){
        const apiKey = '42fbd0fb5191c27066beb67f596394ce';
        const url = `//api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.long}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    async getDataByCity(input){
        const apiKey = '42fbd0fb5191c27066beb67f596394ce';
        const url = `//api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
}

export default Fetch;