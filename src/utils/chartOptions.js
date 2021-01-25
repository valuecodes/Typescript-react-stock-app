export default{
    responsive:true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display:false
        }
    },
    scales: {
        yAxes: [{
            id: 'stockPrice',
            type: 'linear',
            position: 'left',
            ticks: {
                beginAtZero: true,
            },

        }, {
            id: 'stockEps',
            type: 'linear',
            position: 'right',
            ticks: {
                display:false,
                beginAtZero: true,
            },
            gridLines: {
                display:false,
                
            }   
        }],
    },
    legend: {
        labels: {
            filter: function(item) {
                return ['Stock Price Estimate','Intrinsic Value Estimate','EPS estimate','Dividend Estimate'].includes(item.text)
            }
        },
        color:'white'
    }
}