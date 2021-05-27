let select = document.getElementById('select-box');
let data = fetch('https://restcountries.eu/rest/v2/all').then(res => res.json()).then(data => {

    let html;

    html += '<option selected>' + 'all' + '</option>';

    for (let i = 0; i < data.length; i++) {

        html += '<option>' + data[i].name + '</option>';
    }

    select.innerHTML = html;
});