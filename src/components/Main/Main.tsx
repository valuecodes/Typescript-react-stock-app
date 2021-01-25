import React,{useState,useEffect} from 'react'
import { Button, Card, TextField } from '@material-ui/core'
import './Main.css'
import { Line } from 'react-chartjs-2';
import Slider from '@material-ui/core/Slider';
import chartOptions from '../../utils/chartOptions';
import NumberInput from './NumberInput';

interface StockInputs{
    text: string,
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
        text:'KAMUX',
        stockPrice:13.4,
        eps:0.57,
        dividend:0.23,
        growthRate:10,
        normalizedPE:15
    })

    const [stockOutputs,setStockOutputs] = useState<StockOutputs>({
        pe:0,
        divYield:0
    })

    const [chart,setChart] = useState({
        data:{},
        options:chartOptions
    })

    useEffect(() => {
        if(
            stockInputs.stockPrice && 
            stockInputs.eps && 
            stockInputs.dividend
        ){
            const pe:number = +(stockInputs.stockPrice / stockInputs.eps).toFixed(1) 
            const divYield:number = +((stockInputs.dividend / stockInputs.stockPrice)*100).toFixed(1) 
            setStockOutputs({...stockOutputs, pe, divYield})
        }
    }, [stockInputs])



    useEffect(() => {
        if(
            stockInputs.stockPrice && 
            stockInputs.eps && 
            stockInputs.dividend && 
            stockInputs.growthRate && 
            stockInputs.normalizedPE
        ){
            
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
            let peVariance:number = stockInputs.normalizedPE - currentPE 
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

            let annualReturn:number = +((((endPrice/stockInputs.stockPrice)**(1/10))-1)*100).toFixed(1)

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
            setChart(newChart)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stockInputs])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        let { name, value } = e.target
        setStockInputs({...stockInputs, [name]:value})
    }
    
    const sliderChangeHandler = (value:number,name:string): void => {
        setStockInputs({...stockInputs,[name]:value})
    }

    const resetInputsHandler = (): void  => {
        setStockInputs({
            text:'Enter Values...',
            stockPrice:null,
            eps:null,
            dividend:null,
            growthRate:5,
            normalizedPE:15
        })
        setChart({...chart,data:{}})
        setStockOutputs({
            pe:0,
            divYield:0
        })
    }

    return (
        <div className='main'>
            <Card className='stockInputs'>
                <div className='stockInputHeader'>
                    <h2>{stockInputs.text}</h2>
                    <Button variant="outlined" color="secondary" size='small' onClick={resetInputsHandler}>
                        Reset
                    </Button>
                </div>
                <NumberInput
                    name={'stockPrice'}
                    value={stockInputs.stockPrice}
                    onChange={handleInputChange} 
                />
                <NumberInput
                    name={'eps'}
                    value={stockInputs.eps}
                    onChange={handleInputChange} 
                />
                <NumberInput
                    name={'dividend'}
                    value={stockInputs.dividend}
                    onChange={handleInputChange} 
                />
                <div className='stockInputsSmall'>
                    <NumberInput
                        name={'pe'}
                        value={stockOutputs.pe}
                        onChange={handleInputChange} 
                        readOnly={true}
                    />
                    <NumberInput
                        name={'dividendYield'}
                        value={stockOutputs.divYield}
                        onChange={handleInputChange} 
                        readOnly={true}
                    />                  
                </div>
                <div className='sliderInput'>
                    <p>Annual Earnings Growth Rate</p>
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