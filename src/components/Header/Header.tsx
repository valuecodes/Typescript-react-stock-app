import React from 'react'
import AppBar from '@material-ui/core/AppBar';

 const Header: React.FC = () => {
    return (
        <div className='header'>
            <AppBar>
                <div className='container'>
                    <h1>Stock Analyzer</h1>
                </div>
            </AppBar >
        </div>
    )
}

export default Header