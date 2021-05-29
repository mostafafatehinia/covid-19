let select = document.getElementById('select-box');
var myChart;
window.onload = init()

let data = fetch('https://restcountries.eu/rest/v2/all').then(res => res.json()).then(data => {

    let html = '';

    html += '<option selected>' + 'All' + '</option>';

    for (let i = 0; i < data.length; i++) {

        html += '<option>' + parenthesesRemover(data, i) + '</option>';
    }

    select.innerHTML = html;
});


select.onchange = function(event) {

    let country = event.target.value;
    let date = new Date().toISOString().substr(0, 10);
    let url = `https://api.covid19tracking.narrativa.com/api/${date}/country/${country}`
    if (country === 'All') {
        init()
    } else {
        fetch(url).then(res => res.json()).then(data => {
            let infoPerCountry = data.dates[date].countries[country]

            tableBodyCreate(infoPerCountry.name, infoPerCountry.today_confirmed, infoPerCountry.today_recovered, infoPerCountry.today_deaths)
            if (myChart) {
                myChart.destroy()
            }
            chartDrawer(infoPerCountry.today_deaths, infoPerCountry.today_recovered)

        })
    }

}

function parenthesesRemover(input, index) {

    return input[index].name.split('(')[0]

}


function tableBodyCreate(name, confirmed, recovered, deaths) {
    let tbody = document.getElementById('table-body');
    let html = '<tr>';
    if (name === 'all') {
        html += `<td><img src="static/img/earth.png" title="World"></img></td>`;
    } else {
        html += `<td><i class="flag flag-${ String(name).toLowerCase()}" title=${ name }></i></td>`;
    }
    html += `<td> ${ confirmed } </td>`;
    html += `<td> ${ recovered } </td>`;
    html += `<td> ${ deaths } </td>`;

    tbody.innerHTML = html;
}

function chartDrawer(deaths, recovered) {
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Death', 'Recovered'],
            datasets: [{
                label: '# of Votes',
                data: [deaths, recovered],
                backgroundColor: [
                    'rgba(220, 53, 69)',
                    'rgba(0, 183, 74)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: false
        }
    });
}

function init() {
    let date = new Date().toISOString().substr(0, 10);
    let url = `https://api.covid19tracking.narrativa.com/api/${date}/country/all`
    fetch(url).then(res => res.json()).then(data => {
        let infoAllCountries = data.total

        tableBodyCreate('all', infoAllCountries.today_confirmed, infoAllCountries.today_recovered, infoAllCountries.today_deaths)
        if (myChart) {
            myChart.destroy()
        }
        chartDrawer(infoAllCountries.today_deaths, infoAllCountries.today_recovered)

    })
}

function filter() {
    var keyword = document.getElementById("search").value;
    var options = document.getElementsByTagName('option');
    console.log(options[0].innerText)
    for (var i = 0; i < options.length; i++) {
        var txt = options[i].innerText;
        if (txt.substring(0, keyword.length).toLowerCase() !== keyword.toLowerCase() && keyword.trim() !== "") {
            options[i].style.display = 'none';
        } else {
            options[i].style.display = 'list-item';
        }
    }
}