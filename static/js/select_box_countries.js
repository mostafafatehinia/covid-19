let select = document.getElementById('select-box');
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