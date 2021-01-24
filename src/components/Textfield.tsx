import React,{useState} from 'react'

interface Person {
    firstName: string,
    lastName: string
}

interface Props {
    text: string,
    ok?: boolean,
    i?: number,
    fn?: ()=> void,
    person:Person
}

const Textfield: React.FC<Props> = ({person,text}) =>{

    const [count, setCount] = useState<number | null>(5)

    return (
        <div>
            <input/>
        </div>
    )
}

export default Textfield
