import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Login({ onLogin }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [setName] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:7070/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            console.log(data);
            if (data.err) {
                if (data.msg === "this user not exist. please sign up") {
                    alert('משתמש אינו רשום. נא בדקי את הפרטים או הרשמי')
                } else if (data.msg === "incorrect password") {
                    alert('שם או סיסמה אינם נכונים')
                } else if (data.msg === 'missing param username') {
                    alert('חסרים פרטים. נא לוודא שכל השדות מולאו')
                } else {
                    alert(data.msg)
                    delete localStorage.token
                }
            } else {
                localStorage.token = data.token
                const { name } = jwtDecode(data.token)
                // setName(name)
                onLogin({ name })
                console.log(onLogin.value.username);
                navigate('/home')
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

                    <Typography variant='h6' component='h2'>התחברות</Typography>
                </Box>
                <Box className='fields-container'>

                    <Box>
                        <TextField
                            className='fields'
                            label='שם משתמש'
                            variant='outlined'
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
                    <Box>
                        <Button type='submit' variant="contained" color="primary" size="large">התחברי</Button>
                    </Box>
                </Box>
            </form>
        </div>
    )
}
