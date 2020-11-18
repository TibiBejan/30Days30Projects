// CHART ELEMENTS
const totalCasesChart = document.getElementById('totalCases-chart').getContext('2d');
const totalActiveChart = document.getElementById('totalActive-chart').getContext('2d');
const totalRecoveredChart = document.getElementById('totalRecovered-chart').getContext('2d');
const totalDeathsChart = document.getElementById('totalDeaths-chart').getContext('2d');
// UI ELEMENTS
const confirmedCases_span = document.getElementById('confirmedCases');
const activeCases_span = document.getElementById('activeCases');
const recoveredCases_span = document.getElementById('recoveredCases');
const deathCases_span = document.getElementById('deathCases');
const recoveredRate_span = document.getElementById('recovered-rate');
const deathRate_span = document.getElementById('death-rate');

const searchForm = document.querySelector('.search-form');

const url = 'https://api.covid19api.com';
const currentDate = new Date();
let searchQuery;

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', init);
searchForm.addEventListener('submit', validateInput);

function init(){
    populateUI(getGlobalData);
    createDonnutChart();
}

function validateInput(e){
    e.preventDefault();
    const formInput = this.querySelector('input');
    searchQuery = formInput.value;
}


// FETCH GLOBAL DATA FROM API
async function fetchGlobalData(){
    const response = await fetch(`${url}/world/total`);

    try{
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getGlobalData(){
    const data = await fetchGlobalData();
    const globalData = {
        totalCases: data.TotalConfirmed,
        totalRecovered: data.TotalRecovered,
        totalDeaths: data.TotalDeaths,
    }

    globalData.totalActive = globalData.totalCases - globalData.totalRecovered - globalData.totalDeaths;
    globalData.recoveredRate = ((globalData.totalRecovered / globalData.totalCases) * 100).toFixed(2);
    globalData.deathRate = ((globalData.totalDeaths / globalData.totalCases) * 100).toFixed(2);

   return globalData;
}


async function populateUI(targetData){
    const data = await targetData();

    confirmedCases_span.textContent = numberWithCommas(data.totalCases);
    activeCases_span.textContent = numberWithCommas(data.totalActive);
    recoveredCases_span.textContent = numberWithCommas(data.totalRecovered);
    deathCases_span.textContent = numberWithCommas(data.totalDeaths);
    recoveredRate_span.textContent =  `${data.recoveredRate}%`;
    deathRate_span.textContent = `${data.deathRate}%`;
}


async function createDonnutChart(){
    const data = await getGlobalData();

    const donnutChart = document.getElementById('donnut-chart').getContext('2d');
    const totalCasesChart = new Chart(donnutChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [data.totalCases, data.totalActive, data.totalRecovered, data.totalDeaths],
                fill: true,
                backgroundColor: [
                    '#2969eb',
                    '#f9bf2f',
                    '#3cb36f',
                    '#e3401b'

                ],
            }],
            labels: [
                'Confirmed Cases',
                'Active Cases',
                'Recovered Cases',
                'Deaths Cases'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                position: 'right',
                display: true,
                text: 'Global Cases'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

createLineChart(totalCasesChart, 'Total Cases');
createLineChart(totalActiveChart, 'Total Active Cases');
createLineChart(totalRecoveredChart, 'Total Recovered Cases');
createLineChart(totalDeathsChart, 'Total Death Cases');

async function createLineChart(targetChart, title){
    // const data = await getDailyData();

    const myChart = new Chart(targetChart, {
        type: 'line',
        data: {
            datasets: [{
                data: [10, 20, 30, 5],
                backgroundColor: [
                    '#2969eb',
                    '#f9bf2f',
                    '#3cb36f',
                    '#e3401b'

                ]
            }],
            labels: [
                'Confirmed',
                'Active',
                'Recovered',
                'Deaths'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                position: 'top',
                display: true,
                text: title
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}


// PUT COMMAS ON THOUSANDS
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

















