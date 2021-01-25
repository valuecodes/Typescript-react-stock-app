import React from 'react'
import { Button } from '@material-ui/core'

interface Props {
    reset:()=>void
}

const ResetButton: React.FC<Props> = ({reset}) => {
    return (
        <Button className='resetButton' variant="outlined" color="secondary" size='small' onClick={reset}>
            Reset
        </Button>
    )
}

export default ResetButton