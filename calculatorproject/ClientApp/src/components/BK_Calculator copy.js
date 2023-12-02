import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Notification from './Notification';

const Calculator = () => {

    const [open, setOpen] = useState(false);
    const [typeMessage, setTypeMessage] = useState("");
    const [message, setMessage] = useState("");
    const [listNumbers, setListNumbers] = useState([]);
    const [tempNumber, settempNumber] = useState(0);

    useEffect(() => {
        if (open) {
            setTimeout(() => { setOpen(false) }, 5000);
        }
    }, [open]);



    const AddToList = () => {

        setListNumbers([...listNumbers, tempNumber]);
        settempNumber(0);
    };

    const Clean = () => {

        setListNumbers([]);
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
            setMessage(`Este es es resultado: ${data.value}`);
            setTypeMessage("success");
            setOpen(true);
        } else {
            setMessage(`Ocurrio un error`);
            setTypeMessage("error");
            setOpen(true);
        }

    };

    const Subtract = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listNumbers)
        }

        const response = await fetch('calculator/subtract', requestOptions);
        const data = await response.json();

        if (response.ok) {
            setMessage(`Este es es resultado: ${data.value}`);
            setTypeMessage("success");
            setOpen(true);
        } else {
            setMessage(`Ocurrio un error`);
            setTypeMessage("error");
            setOpen(true);
        }

    };

    const multiplication = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listNumbers)
        }
        const response = await fetch('calculator/multiplication', requestOptions);
        const data = await response.json();

        if (response.ok) {
            setMessage(`Este es es resultado: ${data.value}`);
            setTypeMessage("success");
            setOpen(true);
        } else {
            setMessage(`Ocurrio un error`);
            setTypeMessage("error");
            setOpen(true);
        }
    }

    const division = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listNumbers)
        }
        const response = await fetch('calculator/division', requestOptions);
        const data = await response.json();

        if (response.ok) {
            setMessage(`Este es es resultado: ${data.value}`);
            setTypeMessage("success");
            setOpen(true);
        } else {
            setMessage(`Ocurrio un error`);
            setTypeMessage("error");
            setOpen(true);
        }

    }



    return (
        <div style={{ textAlign: 'center' }}>
            <Notification message={message} open={open} type={typeMessage}></Notification>
            <h1>Calculadora</h1>
            <TextField type="number" key="texto" label="Outlined" variant="outlined" value={tempNumber} onChange={(e) => {
                //console.log(e);
                settempNumber(parseFloat(e.target.value))
            }} />
             <br/>
             <br/>
            <Button onClick={AddToList} variant="outlined">Agregar</Button>
            <br/>
            {
                listNumbers.join(', ')
            }
            <hr />
            <Button onClick={Sum} variant="contained">+</Button>
            <Button onClick={Subtract} variant="contained">-</Button>
            <br/>
            <Button onClick={multiplication} variant="contained">*</Button>
            <Button onClick={division} variant="contained">/</Button>
            <hr />
            <Button onClick={Clean} variant="outlined">Limpiar</Button>
            <br></br>
        </div>

    );
}

export default Calculator;