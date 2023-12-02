import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Notification from './Notification';

const Calculator = () => {
    const [open, setOpen] = useState(false);
    const [typeMessage, setTypeMessage] = useState("");
    const [message, setMessage] = useState("");
    const [listNumbers, setListNumbers] = useState([]);
    const [tempNumber, setTempNumber] = useState(0);
    const [currentCalculation, setCurrentCalculation] = useState("");

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    }, [open]);


    const AddToList = () => {
        setListNumbers([...listNumbers, tempNumber]);
        setTempNumber(0);
    };

    const Clean = () => {
        setListNumbers([]);
        setCurrentCalculation("");
        setTempNumber(0);
    };

    const performOperation = async (endpoint) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listNumbers)
        };

        const response = await fetch(`calculator/${endpoint}`, requestOptions);
        const data = await response.json();

        if (response.ok) {
            setMessage(`Este es el resultado: ${data.value}`);
            setTypeMessage("success");
            setOpen(true);
            setCurrentCalculation("");
            setListNumbers([data.value]); // Only store the result for further operations
        } else {
            setMessage(`Ocurrió un error`);
            setTypeMessage("error");
            setOpen(true);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Notification message={message} open={open} type={typeMessage}></Notification>
            <h1>Calculadora</h1>
            <TextField
                type="number"
                key="texto"
                label="Outlined"
                variant="outlined"
                value={tempNumber}
                onChange={(e) => setTempNumber(parseFloat(e.target.value))}
            />
            <br />
            <br />
            <Button onClick={AddToList} variant="outlined">
                Agregar
            </Button>
            <br />
            {listNumbers.join(', ')}
            <hr />
            <Button onClick={() => performOperation('sum')} variant="contained">
                +
            </Button>
            <Button onClick={() => performOperation('subtract')} variant="contained">
                -
            </Button>
            <br />
            <Button onClick={() => performOperation('multiplication')} variant="contained">
                *
            </Button>
            <Button onClick={() => performOperation('division')} variant="contained">
                /
            </Button>
            <hr />
            <Button onClick={Clean} variant="outlined">
                Limpiar
            </Button>
            <br />
        </div>
    );
};

export default Calculator;
