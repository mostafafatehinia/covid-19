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


function parenthesesRemover(input, index) {

    return input[index].name.split('(')[0]

}

select.onchange = function(event) {

    let country = event.target.value;
    let date = new Date().toISOString().substr(0, 10);
    let url = `https://api.covid19tracking.narrativa.com/api/${date}/country/${country}`

    fetch(url).then(res => res.json()).then(data => {
        let infoPerCountry = data.dates[date].countries[country]

        tableBodyCreate(infoPerCountry)
        if (myChart) {
            myChart.destroy()
        }
        chartDrawer(infoPerCountry)

    })
}

function tableBodyCreate(input) {
    let tbody = document.getElementById('table-body');
    let rate = ((input.today_deaths - input.yesterday_deaths) / input.yesterday_deaths) * 100
    let html = '<tr>';

    html += `<td><i class="flag flag-${ String(input.name).toLowerCase()}" title=${ input.name }></i></td>`;
    html += `<td> ${ input.today_confirmed } </td>`;
    html += `<td> ${ input.today_recovered } </td>`;
    html += `<td> ${ input.today_deaths } </td>`;

    tbody.innerHTML = html;
}

function chartDrawer(input) {
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Death', 'Recovered'],
            datasets: [{
                label: '# of Votes',
                data: [input.today_deaths, input.today_recovered],
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