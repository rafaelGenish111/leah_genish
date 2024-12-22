import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import SearchResults from './SearchResults';


export default function Home({ name }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('https://leah-genish.onrender.com/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({ searchTerm })
      })
      const data = await res.json()
      if (data.err === false) {
        console.log('Success:', data);
        setSearchResults(data.msg)
      } else {
        alert(data.msg)
        console.log('failed:', data);
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
          <Typography variant='h5' component='h3'>שלום {name}</Typography>
          <Typography variant='h6' component='h2'>חיפוש</Typography>
        </Box>
        <Box className='search-bar'>
          <TextField
            className='fields'
            label='הקלידי ת.ז. או שם'
            variant='outlined'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button type='submit' variant="contained" color="primary" size="large">שלחי</Button>
        </Box>
        </form>
      {
        searchResults ?
          (
            <div>
              <SearchResults data={searchResults} />
            </div>
          ) : (
            <h2>אין נתונים</h2>
          )
      }
    </div>
  )
}
