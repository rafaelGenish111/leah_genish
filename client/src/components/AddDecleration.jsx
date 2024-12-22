import React, { useRef, useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

export default function AddDecleration() {
    const [id, setId] = useState(null)
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [hltStt, setHltStt] = useState({
        אפילפסיה: false,
        בעיית_שלד: false,
        עמוד_שדרה: false,
        שבר: false,
        נקע: false,
        דלקות_פרקים: false,
        סינוסים: false,
        לחץ_דם: false,
        הפרעות_עיכול: false,
        סרטן: false,
        בעיות_הורמונליות: false,
        סוכרת: false,
        אסתמה: false,
        פסוריאזיס: false,
        ניתוח_לאחרונה: false,
        // אחר: ''
    })
    const [date] = useState(new Date().toISOString().slice(0, 10))
    const [sign, setSign] = useState(null)
    const signPad = useRef(null)

    const formatDiseaseName = (diseaseName) => {
        return diseaseName.replace('_', ' ')
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setHltStt((prevIssues) => ({
            ...prevIssues,
            [name]: checked
        }));
    };

    const createCheckboxes = () => {
        return Object.keys(hltStt).map((issue) => (
            <FormControlLabel
                className='checkbox-container'
                key={issue}
                control={
                    <Checkbox
                        name={issue}
                        checked={hltStt[issue]}
                        onChange={handleCheckboxChange}
                    />
                }
                label={formatDiseaseName(issue)}
            />
        ))
    }

    const validateId = (id) => {
        if (typeof id !== 'string') {
            return false
        }

        id = id.trim();

        if (id.length !== 9) {
            return false;
        }

        return /^\d{9}$/.test(id);
    };

    const clearSignature = () => {
        signPad.current.clear()
        setSign(null)
    }

    const handleSignatureChange = () => {
        setSign(signPad.current.toDataURL())
    }
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (validateId) {
                const res = await fetch('https://leah-genish.onrender.com/declerations/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, fname, lname, phone, hltStt, date, sign })
                })
                const data = await res.json();
                if (data.err === false) {
                    console.log('Success:', data);
                    navigate('/thankyou')

                } else {
                    if (data.msg.code === 'ER_BAD_NULL_ERROR') {
                        alert("הפרטים שהזנת אינם תקינים")
                    } else {
                        alert('המידע לא נקלט. נסי שנית')
                        console.log('failed:', data);
                    }
                }
            } else {
                alert('תעודת זהות אינה תקינה')
            }
        } catch (error) {

        }
    }
    return (
        <form onSubmit={handleSubmit} className='form'>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
                className='header'
            >

                <Typography variant='h6' component='h2'>הצהרת בריאות</Typography>
            </Box>
            <Box className='fields-container'>
                <Box>
                    <TextField
                        className='fields'
                        label='תעודת זהות'
                        variant='outlined'
                        value={id}
                        onChange={e => setId(e.target.value)}
                        error={!validateId(id)}
                        helperText={!validateId(id) ? 'תעודת זהות לא תקינה' : ''}
                    />
                </Box>
                <Box>
                    <TextField
                        className='fields'
                        label='שם פרטי'
                        variant='outlined'
                        value={fname}
                        onChange={e => setFname(e.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        className='fields'
                        label='שם משפחה'
                        variant='outlined'
                        value={lname}
                        onChange={e => setLname(e.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        className='fields'
                        label='מספר טלפון'
                        variant='outlined'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Box>
            </Box>
            <p>:האם הינך סובלת מ</p>
            <Box className='checkboxes-container'>
                {createCheckboxes()}
            </Box>
            <Box>
                <h1> </h1>
                <Checkbox />
                <p> אני מאשרת כי כל המידע שמסרתי נכון</p>
            </Box>
            <Box className='signature-container'>
                <SignatureCanvas
                    ref={signPad}
                    onEnd={handleSignatureChange}
                    penColor='red'
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                    className='signature-pad'
                />
                    <Button type='button' onClick={clearSignature}>נקה חתימה</Button>
                </Box>
                <Box>
                <Button type='submit' variant="contained" color="primary" size="large">שלחי</Button>
            </Box>
        </form>
    )
}
