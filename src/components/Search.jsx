import React, { useState } from 'react'
import { Button, LinearProgress, TextField } from '@material-ui/core'
import api from '../api/api';

const HTTP_URL_VALIDATOR = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
    const [link, setLink] = useState("");
    const [short, setShort] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const  handleSubmit = ((e) => {
        e.preventDefault();
        if(checkLink(link)){
            getLink(link) 
            setLink("")
            setIsLoading(!isLoading)
        } else {
            setShort('please input valid url')
        }
    });

    const checkLink = (string) => {
        return string.match(HTTP_URL_VALIDATOR)
    }

    const getLink = async () => {
        await api
        .get(`shorten?url=${link}`)
        .then((response) => {
            setShort(response.data.result.short_link)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error(error)
        })
    }
return (
    <>
    <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column'}}>
        <TextField
            style={{ marginBottom: '30px'}}
            label='Link'
            variant='outlined'
            value={link}
            onChange={(e) => setLink(e.target.value)}
        />
        {!isLoading && (
            <Button 
                color='primary'
                variant='contained'
                onClick={(e) => handleSubmit(e)}
                style={{ marginBottom: '20px'}}
            >
                Submit
            </Button>   
        )}

            {isLoading && <LinearProgress />}
    </form> 
    {short && (
        <div>
            <p>Short Link: {short}</p>
        </div>
    )}
    </>
)
}
export default Search