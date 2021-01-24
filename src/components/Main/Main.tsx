import React,{useState,useEffect} from 'react'
import { Card, TextField } from '@material-ui/core'
import './Main.css'
import { Line } from 'react-chartjs-2';
import Slider from '@material-ui/core/Slider';

interface StockInputs{
    stockPrice: number|null,
    eps: number|null,
    dividend: number|null,
    growthRate: number|null,
    normalizedPE: number|null,
}

interface StockOutputs{
    pe: number|null,
    divYield: number|null,
}

const currentYear:number = new Date().getFullYear()

const Main:React.FC = () => {

    const [stockInputs,setStockInputs] = useState<StockInputs>({
        stockPrice:165,
        eps:8.5,
        dividend:4.5,
        growthRate:5,
        normalizedPE:15
    })

    const [stockOutputs,setStockOutputs] = useState<StockOutputs>({
        pe:0,
        divYield:0
    })

    const [chart,setChart] = useState({
        data:{},
        options:{
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
                        // max:stockInputs.stockPrice*2
                    },
                    gridLines: {
                        display:false,
                        
                    }   
                }],
            },
            legend: {
                labels: {
                    filter: function(item:any) {
                        return ['Stock Price Estimate','Intrinsic Value Estimate','EPS estimate','Dividend Estimate'].includes(item.text)
                    }
                },
                color:'white'
            }
        },
    })

    useEffect(() => {
        if(stockInputs.stockPrice && stockInputs.eps && stockInputs.dividend){
            const pe:number = +(stockInputs.stockPrice / stockInputs.eps).toFixed(1) 
            const divYield:number = +((stockInputs.dividend / stockInputs.stockPrice)*100).toFixed(1) 
            setStockOutputs({...stockOutputs, pe, divYield})
        }
    }, [stockInputs])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let { name, value } = e.target
        setStockInputs({...stockInputs, [name]:value})
    }

    useEffect(() => {
        if(stockInputs.stockPrice && stockInputs.eps && stockInputs.dividend && stockInputs.growthRate&& stockInputs.normalizedPE){
            
            const priceArray:Array<number> = []
            const labelArray:Array<number> = []
            const endValueArray:Array<number|null> = []
            const dividendArray:Array<number> = []
            const nullArray:Array<number> = []
            const annualReturnArray:Array<number|null> = []
            const dividendReturnArray:Array<number|null> = []

            const currentPE:number = stockInputs.stockPrice / stockInputs.eps
            let currentEps:number = stockInputs.eps
            let growthPercent:number = (stockInputs.growthRate/100)+1
            let currentDividend:number = stockInputs.dividend
            let peVariance = stockInputs.normalizedPE - currentPE 
            let endPrice:number = 0
            let totalDivs:number = 0
            let divYield:number = +((stockInputs.dividend / stockInputs.stockPrice)*100).toFixed(1)

            for(var i=0;i<=10;i++){
                let newPrice:number = currentEps*(currentPE+((peVariance/10)*i))
                let newEps:number = currentEps*=growthPercent
                let newDividend:number = currentDividend*=growthPercent                
                annualReturnArray.push(i===4?newPrice:null)
                dividendReturnArray.push(i===3?(newPrice+totalDivs):null)
                labelArray.push(i+currentYear)
                priceArray.push(newPrice)
                endPrice = newPrice
                endValueArray.push(i===10?+endPrice.toFixed():null)
                dividendArray.push(newPrice+totalDivs)
                totalDivs+=newDividend
                nullArray.push(0)

            }

            let annualReturn = +((((endPrice/stockInputs.stockPrice)**(1/10))-1)*100).toFixed(1)

            let newChart={
                ...chart,
                data:{
                    labels: labelArray,
                    datasets:[
                        {
                            label: 'Current Stock Price',
                            data:[stockInputs.stockPrice],
                            backgroundColor:'#4DA5EE',
                            borderColor:'#4DA5EE',
                            pointRadius:8,
                            yAxisID:'stockPrice',
                            datalabels : {
                                align	: 'right',
                                anchor : 'end',
                                display: true,                        
                                formatter: function() {
                                    return 'Current Price '+stockInputs.stockPrice;
                                },
                                backgroundColor: function() {
                                    return '#4DA5EE';
                                },
                                borderRadius: 4,
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        {
                            label: 'Price estimate',
                            data:endValueArray,
                            backgroundColor:'white',
                            borderColor:'#4DA5EE',
                            pointBorderWidth:2,
                            pointRadius:15,
                            yAxisID:'stockPrice',
                            datalabels : {
                                align	: 'center',
                                anchor : 'center',
                                display: true,
                                formatter: function() {
                                    return endPrice.toFixed(0);
                                },
                                backgroundColor: function() {
                                    return 'white';
                                },
                                borderRadius: '50%',
                                border:10,
                                color: 'rgb(88, 88, 88)',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        {
                            label: 'Annual Return percent',
                            data:annualReturnArray,
                            backgroundColor:'#4DA5EE',
                            borderColor:'#4DA5EE',
                            pointRadius:8,
                            yAxisID:'stockPrice',
                            datalabels : {
                                align	: 'center',
                                anchor : 'center',
                                display: true,
                                formatter: function() {
                                    return `${annualReturn}% p.a.`;
                                },
                                backgroundColor: function() {
                                    return '#4DA5EE';
                                },
                                borderRadius: 4,
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        {
                            label: 'Dividend Return percent',
                            data:dividendReturnArray,
                            backgroundColor:'rgba(242, 245, 59,1)',
                            borderColor:'rgba(242, 245, 59,1)',
                            pointRadius:8,
                            yAxisID:'stockPrice',
                            datalabels : {
                                align	: 'center',
                                anchor : 'center',
                                display: true,
                                formatter: function() {
                                    return `${divYield}% p.a.`;
                                },
                                backgroundColor: function() {
                                    return 'rgba(242, 245, 59,1)';
                                },
                                borderRadius: 4,
                                color: 'rgb(88, 88, 88)',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        {
                            label: 'Null Array',
                            data:nullArray,
                            backgroundColor:'rgba(77, 165, 238,0)',
                            borderColor:'rgba(77, 165, 238,0)',
                            pointRadius:0,
                            yAxisID:'stockPrice',
                            fill: '-1',
                        },
                        {
                            label: 'Stock Price Estimate',
                            data:priceArray,
                            backgroundColor:'rgba(77, 165, 238,0.2)',
                            borderColor:'rgba(77, 165, 238,0.5)',
                            pointRadius:0,
                            yAxisID:'stockPrice',
                            fill: '-1',
                        },
                        {
                            label: 'Dividend Estimate',
                            data:dividendArray,
                            backgroundColor:'rgba(242, 245, 59,0.3)',
                            borderColor:'rgba(242, 245, 59,1)',
                            pointRadius:0,
                            yAxisID:'stockPrice',
                            fill: '-1',
                        },
                    ]
                }
            }
            console.log(newChart)

            const newDataset = {
                    label: 'Current Stock Price',
                    data:[priceArray],
                    backgroundColor:'#4DA5EE',
                    borderColor:'#4DA5EE',
                    pointRadius:8,
                    // yAxisID:'stockPrice',
            }

            // newChart.data.datasets.push(newDataset)
            setChart(newChart)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stockInputs])

    const sliderChangeHandler = (value:number,name:string) => {
        console.log(value)
        setStockInputs({...stockInputs,[name]:value})
    }

    return (
        <div className='main'>

            <Card className='stockInputs'>
                <TextField 
                    name='stockPrice' 
                    value={stockInputs.stockPrice||''} 
                    onChange={handleInputChange} 
                    type="number" 
                    id="standard-basic" 
                    label="Stock Price" 
                />
                <TextField 
                    name='eps' 
                    value={stockInputs.eps||''} 
                    onChange={handleInputChange} 
                    type="number" 
                    id="standard-basic" 
                    label="EPS"              
                />
                <TextField 
                    name='dividend' 
                    value={stockInputs.dividend||''} 
                    onChange={handleInputChange} 
                    type="number" 
                    id="standard-basic" 
                    label="Dividend"              
                />
                <div className='stockInputsSmall'>
                    <TextField 
                        name='eps' 
                        value={stockOutputs.pe||''} 
                        onChange={handleInputChange} 
                        type="number" 
                        id="standard-basic" 
                        label="Price To Earnings"  
                        InputProps={{
                            readOnly: true,
                        }}            
                    />                    
                    <TextField 
                        name='dividendYield' 
                        value={stockOutputs.divYield||''} 
                        onChange={handleInputChange} 
                        type="number" 
                        id="standard-basic" 
                        label="Dividend Yield %"  
                        InputProps={{
                            readOnly: true,
                        }}            
                    />                    
                </div>
                <div className='sliderInput'>
                    <p>Growth Rate</p>
                    <Slider
                        value={stockInputs.growthRate||0} 
                        aria-labelledby="discrete-slider"
                        step={1}
                        min={1}
                        max={30}
                        onChange={(e,value)=>sliderChangeHandler(+value,'growthRate')} 
                    />           
                    <label>{stockInputs.growthRate}%</label>         
                </div>
                <div className='sliderInput'>
                    <p>Normalized PE</p>
                    <Slider
                        value={stockInputs.normalizedPE||0} 
                        aria-labelledby="discrete-slider"
                        step={1}
                        min={1}
                        max={50}
                        onChange={(e,value)=>sliderChangeHandler(+value,'normalizedPE')} 
                    />           
                    <label>{stockInputs.normalizedPE}</label>         
                </div>

            </Card>
            <Card className='stockPriceSimulatorChart'>            
                <Line data={chart.data} options={chart.options} />
            </Card>
        </div>

    )
}

export default Main