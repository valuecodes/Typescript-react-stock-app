export const calculatePE=(price:number,eps:number):number=>{
    return +(price / eps).toFixed(1)
}

export const calculateDivYield = (price:number,dividend:number):number=>{
    return +(dividend / price).toFixed(1)
}