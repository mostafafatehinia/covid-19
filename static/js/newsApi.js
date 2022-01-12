let url = `https://saurav.tech/NewsAPI/top-headlines/category/health/us.json`;

fetch(url).then(res => res.json()).then(data => {

    let neswHtml = document.getElementById('news');
    let html = '';

    for (let i = 0; i < 3; i++) {
        html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
        html += '<div class="card">';
        if (data.articles[i].urlToImage) {
            html += `<img src="${data.articles[i].urlToImage}" class="card-img-top" alt="Some Issues Happen!">`;
        } else {
            html += `<img src="static/img/news2.jpg" class="card-img-top" alt="Some Issues Happen!">`;
        }
        html += '<div class="card-body">';
        html += `<h5 class = "card-title">${data.articles[i].title}</h5>`;
        html += `<p class="card-text">${data.articles[i].description}</p>`;
        html += `<a href="${data.articles[i].url}" class="btn btn-primary">Read More</a>`;
        html += '</div></div></div>';
    }
    neswHtml.innerHTML = html;
})