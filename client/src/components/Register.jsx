import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:7070/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fname, lname, username, password })
            })
            const data = await res.json()
            console.log(data);
            if (data.err) {
                alert(data.msg)
                delete localStorage.token
            } else {
                alert(`נרשמת בהצלחה, ${data.first_name}`)
                navigate('/login')
            }
        } catch (error) {

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='form'>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
                    className='header'
                >
                    {/* <img src={logo} alt="logo" /> */}
                    <Typography variant='h6' component='h2'>הרשמה</Typography>
                </Box>
                <Box className='fields-container'>

                    <Box>
                        <TextField
                            className='fields'
                            label='שם פרטי'
                            variant='outlined'
                            type='name'
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            className='fields'
                            label='שם משפחה'
                            variant='outlined'
                            type='name'
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            className='fields'
                            label='שם משתמש'
                            variant='outlined'
                            type='email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            className='fields'
                            label='סיסמה'
                            variant='outlined'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button type='submit' variant="contained" color="primary" size="large">הרשמי</Button>
                </Box>
            </form>
        </div>
    )
}
