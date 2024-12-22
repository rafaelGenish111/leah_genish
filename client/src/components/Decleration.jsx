import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Box } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useNavigate } from 'react-router-dom';

export default function Decleration() {
    const [formData, setFormData] = useState(null)
    const [signature, setSignature] = useState(null)
    const [formattedDate, setFormattedDate] = useState('')
    const { decId } = useParams()

    const navigate = useNavigate()

    const formatDiseaseName = (diseaseName) => {
        return diseaseName.replace('_', ' ')
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://leah-genish.onrender.com/declerations/decleration/${decId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.token
                    }
                })
                const data = await res.json()
                console.log(data);
                if (!data.err) {
                    setFormData(data[0])
                   setSignature(data[0].signature)
                    const dbDate = data[0].decleration_date;
                    const day = dbDate.slice(5, 7)
                    const month = dbDate.slice(8, 10)
                    const year = dbDate.slice(0, 4)
                    const formatted = `${day}/${month}/${year}`
                    setFormattedDate(formatted)
                } else {
                    if (data.msg === "token not valid") {
                        alert('נא התחברי מחדש')
                        (navigate('/login'))
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        return () => {

        }
    }, [decId, navigate])

    return (
        <div className='form'>
            {formData ?
                (
                    <div>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5', fontFamily: 'cursive' }}
                        >
                            <Typography variant='h4' component='h3'>טופס הצהרת בריאות {formData.first_name} {formData.last_name} </Typography>
                            <p>{ formattedDate}</p>
                        </Box>
                        <h2>תעודת זהות: {formData.id}</h2>
                        <h2>טלפון: {formData.phone}</h2>
                        {Object.keys(formData.health_status).map((issue) => (
                            <div
                                className='app-checkboxes-container'
                                key={issue}
                            >
                                <p>{formatDiseaseName(issue)}</p>
                                {formData.health_status[issue] ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}                                   
                            </div>
                            
                        ))}
                        <div>
                        <p>חתימה</p>
                        <img src={signature} alt="חתימה"  />
                        </div>
                    </div>
                ) : (
                    <h1>טוען...</h1>
                )
            }
        </div>
    )
}
