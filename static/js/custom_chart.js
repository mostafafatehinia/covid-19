var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Death', 'Recovered'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19],
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