import React from 'react'
import { render } from '@testing-library/react';
import NumberInput from './NumberInput';

test('Renders number input', () => {
  render(
  <NumberInput  
    name={'test'}
    value={1}
    onChange={()=>'test'} 
    readOnly={true}/>
);
});