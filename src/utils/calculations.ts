export const calculatePE=(price:number,eps:number):number=>{
    return +(price / eps).toFixed(1)
}

export const calculateDivYield = (price:number,dividend:number):number=>{
    return +((dividend / price)*100).toFixed(1)
}

export const annualReturn = (currentPrice:number,endPrice:number):number=>{
    return +((((endPrice/currentPrice)**(1/10))-1)*100).toFixed(1)
}