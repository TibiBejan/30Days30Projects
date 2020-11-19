// UI ELEMENTS
const searchForm = document.querySelector('.search-form');
const error_div = document.querySelector('.error');
const url = 'https://api.covid19api.com';
let searchQuery;

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', init);
searchForm.addEventListener('submit', validateInput);

function init(){
    populateUI(getGlobalData);
    createCharts(getGlobalData);
}

// FUNCTION TO VALIDATE INPUT
function validateInput(e){
    e.preventDefault();
    const formInput = this.querySelector('input');
    searchQuery = formInput.value;

    if(searchQuery === ''){
        error_div.classList.add('active');
        return;
    } else {
        error_div.classList.remove('active');
    }

    populateUI(getCountryData);
    createCharts(getCountryData);
}

// FETCH WORLDWIDE DATA
async function fetchGlobalData(){
    const date = createDate();

    const response = await fetch(`${url}/world?from=2020-${date.currentMonth}-01T00:00:00Z&to=2020-${date.currentMonth}-${date.currentDay}T00:00:00Z`);

    try{
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// FETCH COUNTRY DATA
async function fetchCountryData(searchQuery){
    const date = createDate();

    const response = await fetch(`${url}/country/${searchQuery}?from=2020-${date.currentMonth}-01T00:00:00Z&to=2020-${date.currentMonth}-${date.currentDay}T00:00:00Z`);

    try{
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

// GET WORLDWIDE DATA
async function getGlobalData(){
    const data = await fetchGlobalData();

    const currentDate = createDate();
    let dates = [];

    const totalCasesArr = data.map(day => {
        return day.TotalConfirmed;
    });

    const recoveredCasesArr = data.map(day => {
        return day.TotalRecovered;
    });

    const deathCasesArr = data.map(day => {
        return day.TotalDeaths;
    });

    const activeCasesArr = data.map(day => {
        return (day.TotalConfirmed - day.TotalRecovered - day.TotalDeaths);
    });


    for(let i = 1; i <= data.length; i++){
        let date = `${currentDate.currentMonth}/${i.toString().padStart(2, '0')}/${currentDate.currentYear}`;
        dates.push(date);
    }

    const totalCases = data[data.length - 1].TotalConfirmed;
    const totalRecovered = data[data.length - 1].TotalRecovered;
    const totalDeaths = data[data.length - 1].TotalDeaths;
    const totalActive = (totalCases - totalRecovered - totalDeaths);

    const recoveredRate = ((totalRecovered / totalCases) * 100).toFixed(2);
    const deathRate = ((totalDeaths / totalCases) * 100).toFixed(2);

return {totalCasesArr, totalCases, activeCasesArr, totalActive, recoveredCasesArr, totalRecovered, deathCasesArr, totalDeaths, recoveredRate, deathRate, dates};
}

// GET COUNTRY DATA
async function getCountryData(){
    let data = await fetchCountryData(searchQuery);
    const currentDate = createDate();
    let dates = [];

    const totalCasesArr = data.map(day =>{
        if(day.Province === ""){
            return day.Confirmed;
        }
    }).filter(el => el != null);
    const activeCasesArr = data.map(day =>{
        if(day.Province === ""){
            return day.Active;
        }
    }).filter(el => el != null);
    const recoveredCasesArr = data.map(day =>{
        if(day.Province === ""){
            return day.Recovered;
        }
    }).filter(el => el != null);
    const deathCasesArr = data.map(day =>{
        if(day.Province === ""){
            return day.Deaths;
        }
    }).filter(el => el != null);

    for(let i = 1; i <= totalCasesArr.length; i++){
        let date = `${currentDate.currentMonth}/${i.toString().padStart(2, '0')}/${currentDate.currentYear}`;
        dates.push(date);
    }

    const totalCases = totalCasesArr[totalCasesArr.length - 1];
    const totalActive = activeCasesArr[activeCasesArr.length - 1];
    const totalRecovered = recoveredCasesArr[recoveredCasesArr.length - 1];
    const totalDeaths = deathCasesArr[deathCasesArr.length - 1];

    const recoveredRate = ((totalRecovered / totalCases) * 100).toFixed(2);
    const deathRate = ((totalDeaths / totalCases) * 100).toFixed(2);

    return {totalCasesArr, totalCases, activeCasesArr, totalActive, recoveredCasesArr, totalRecovered, deathCasesArr, totalDeaths, recoveredRate, deathRate, dates};
}

// FUNCTION TO UPDATE ELEMENTS CONTENT
async function populateUI(targetData){
    const confirmedCases_span = document.getElementById('confirmedCases');
    const activeCases_span = document.getElementById('activeCases');
    const recoveredCases_span = document.getElementById('recoveredCases');
    const deathCases_span = document.getElementById('deathCases');
    const recoveredRate_span = document.getElementById('recovered-rate');
    const deathRate_span = document.getElementById('death-rate');
    const data = await targetData();

    confirmedCases_span.textContent = numberWithCommas(data.totalCases);
    activeCases_span.textContent = numberWithCommas(data.totalActive);
    recoveredCases_span.textContent = numberWithCommas(data.totalRecovered);
    deathCases_span.textContent = numberWithCommas(data.totalDeaths);
    recoveredRate_span.textContent =  `${data.recoveredRate}%`;
    deathRate_span.textContent = `${data.deathRate}%`;
}

// FUNCTION TO CREATE CHARTS
async function createCharts(targetData){
    const doughnutData = await targetData();
    const chartData = await targetData();

    const chartOptions =  {
        responsive: true,
        title: {
            display: true,
            text: 'COVID19 CASES',
            fontColor: '#fff'
        },
        legend: {
            display: false
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value) {
                        return numberWithCommas(value);
                    }
                }
            }]
        }
    }

    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontColor = '#999';

    // RESET DOUGHNUT CHART
    resetChart('donnut-chart', '.stats__card-donnutChart');

    // CREATE DOUGHNUT CHART
    const doughnutChart = document.getElementById('donnut-chart').getContext('2d');
    const globalChart = new Chart(doughnutChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [doughnutData.totalCases, doughnutData.totalActive, doughnutData.totalRecovered, doughnutData.totalDeaths],
                fill: true,
                backgroundColor: [
                    '#2969eb',
                    '#f9bf2f',
                    '#3cb36f',
                    '#e3401b',
                ],
                borderWidth: 1,
                borderColor: '#000'
            }],
            labels: [
                'Confirmed Cases',
                'Active Cases',
                'Recovered Cases',
                'Death Cases'
            ]
        },
        option: chartOptions
    });

    // RESET TOTAL CASES CHART
    resetChart('totalCases-chart', '.stats__card-totalCasesChart');

    const totalCasesChart = document.getElementById('totalCases-chart').getContext('2d');
    const totalChart = new Chart(totalCasesChart, {
        type: 'bar',
        data: {
            datasets: [{
                data: chartData.totalCasesArr,
                fill: true,
                backgroundColor: '#2969eb',
                borderWidth: 1,
                borderColor: '#000'
            }],
            labels: chartData.dates
        },
        options: chartOptions
    });

    // RESET ACTIVE CASES CHART
    resetChart('totalActive-chart', '.stats__card-totalActiveChart');

    const totalActiveChart = document.getElementById('totalActive-chart').getContext('2d');
    const activeChart = new Chart(totalActiveChart, {
        type: 'bar',
        data: {
            datasets: [{
                data: chartData.activeCasesArr,
                fill: true,
                backgroundColor: '#f9bf2f',
                borderWidth: 1,
                borderColor: '#000'
            }],
            labels: chartData.dates
        },
        options: chartOptions
    });

    // RESET ACTIVE CASES CHART
    resetChart('totalRecovered-chart', '.stats__card-totalRecoveredChart');

    const totalRecoveredChart = document.getElementById('totalRecovered-chart').getContext('2d');
    const recoveredChart = new Chart(totalRecoveredChart, {
        type: 'bar',
        data: {
            datasets: [{
                data: chartData.recoveredCasesArr,
                fill: true,
                backgroundColor: '#3cb36f',
                borderWidth: 1,
                borderColor: '#000'
            }],
            labels: chartData.dates
        },
        options: chartOptions
    });

    // RESET ACTIVE CASES CHART
    resetChart('totalDeaths-chart', '.stats__card-totalDeathsChart');

    const totalDeathsChart = document.getElementById('totalDeaths-chart').getContext('2d');
    const deathsChart = new Chart(totalDeathsChart, {
        type: 'bar',
        data: {
            datasets: [{
                data: chartData.deathCasesArr,
                fill: true,
                backgroundColor: '#e3401b',
                borderWidth: 1,
                borderColor: '#000'
            }],
            labels: chartData.dates
        },
        options: chartOptions
    });
}

// FUNCTION RESET CHART
function resetChart(element, parent){
    document.getElementById(element).remove();
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', element);
    document.querySelector(parent).appendChild(canvas);
}

// CREATE DATE
function createDate(){
    const currentDate = new Date();
   
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return {currentDay, currentMonth, currentYear};
}

// PUT COMMAS ON THOUSANDS
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

















