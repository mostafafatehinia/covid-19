let select = document.getElementById('select-box');
var myChart;

let data = fetch('https://restcountries.eu/rest/v2/all').then(res => res.json()).then(data => {

    let html;

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

    fetch(url).then(res => res.json()).then(data => {
        let infoPerCountry = data.dates[date].countries[country]

        tableBodyCreate(infoPerCountry.name, infoPerCountry.today_confirmed, infoPerCountry.today_recovered, infoPerCountry.today_deaths)
        if (myChart) {
            myChart.destroy()
        }
        chartDrawer(infoPerCountry.today_deaths, infoPerCountry.today_recovered)

    })
}

function parenthesesRemover(input, index) {

    return input[index].name.split('(')[0]

}


function tableBodyCreate(name, confirmed, recovered, deaths) {
    let tbody = document.getElementById('table-body');
    let html = '<tr>';

    html += `<td><i class="flag flag-${ String(name).toLowerCase()}" title=${ name }></i></td>`;
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