import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Calculator = () => {

    const [listNumbers, setListNumbers] = useState([]);

    const [tempNumber, settempNumber] = useState(0);

    const AddToList = () => {

        setListNumbers([...listNumbers, tempNumber]);
        settempNumber(0);
    };

    const Sum = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listNumbers)
        }

        const response = await fetch('calculator/sum', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert(data.value);
        } else {
            alert(data.message || "Error Inesperado!!");
        }

    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Calculadora</h1>
            <TextField  type="number" key="texto" label="Outlined" variant="outlined" value={tempNumber} onChange={(e) => {
                //console.log(e);
                settempNumber(parseFloat(e.target.value))
            }}/>
            <hr/>
            
            <Button onClick={AddToList} variant="outlined">Agregar</Button>
            <br></br>
            {
                listNumbers.join(', ')
            }
            <br></br>
            <Button onClick={Sum} variant="contained">Sumar</Button>
        </div>

    );
}

export default Calculator;