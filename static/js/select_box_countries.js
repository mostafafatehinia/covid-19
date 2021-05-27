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

    })
}

function tableBodyCreate(input) {
    let tbody = document.getElementById('table-body');
    let rate = ((input.today_deaths - input.yesterday_deaths) / input.yesterday_deaths) * 100
        // console.log(tbody.innerHTML)
    let html = '<tr>';
    html += `<td><i class="flag flag-${ String(input.name).toLowerCase()}" title=${ input.name }></i></td>`;
    html += `<td> ${ input.today_confirmed } </td>`;
    html += `<td> ${ input.today_recovered } </td>`;
    html += `<td> ${ input.today_deaths } </td>`;
    // console.log(html)
    tbody.innerHTML = html;
}