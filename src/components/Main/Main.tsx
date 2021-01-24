import React,{useState,useEffect} from 'react'
import { Card, TextField } from '@material-ui/core'
import './Main.css'
import Slider from '@material-ui/core/Slider';

interface StockInputs{
    stockPrice: number|null,
    eps: number|null,
    dividend: number|null,
    growthRate: number|null,
}

interface StockOutputs{
    pe: number|null,
    divYield: number|null,
}

const Main:React.FC = () => {

    const [stockInputs,setStockInputs] = useState<StockInputs>({
        stockPrice:null,
        eps:null,
        dividend:null,
        growthRate:5,
    })

    const [stockOutputs,setStockOutputs] = useState<StockOutputs>({
        pe:0,
        divYield:0
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

    return (
        <div className='main'>

            <div className='stockInputs'>
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
                <Card className='stockInputsSmall'>
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
                </Card>
                <TextField 
                    name='growthRate' 
                    value={stockInputs.growthRate||''} 
                    onChange={handleInputChange} 
                    type="number" 
                    id="standard-basic" 
                    label="Growth Rate %"              
                />
            </div>
        </div>

    )
}

export default Main