import React from 'react'
import { TextField } from '@material-ui/core'
import { camelCaseToString } from '../../utils/utils'

interface Props {
    name: string,
    value: number|null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean
}

const NumberInput: React.FC<Props> = ({name,value,onChange,readOnly=false}) => {
    return (
        <TextField 
            name={name} 
            value={value||''} 
            onChange={onChange} 
            type="number" 
            id="standard-basic" 
            label={camelCaseToString(name)} 
            InputProps={{
                readOnly,
            }}    
        />
    )
}

export default NumberInput