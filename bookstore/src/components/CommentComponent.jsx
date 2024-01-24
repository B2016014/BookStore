import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useAuthContext } from '../hook/useAuthContext';
import axios from 'axios';

const CommentComponent = ({ id }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(null);
    const [hover,setHover]=useState(null)
    const {user}=useAuthContext();
    useEffect(() => {
        console.log(id)
        axios.get(`http://localhost:3000/Books/${id}/comments`)
            .then((res) => {
                setComments(res.data);
                console.log("comments received successfully");
                console.log(res.data)
            })
            .catch((err) => {
                console.log("error in getting the comments " + err);
            })
    }, [])

    const handlePost = () => {
        console.log(rating,comment)
        if(!user){
            alert("please login to post comment")
        }
        else{
        axios.post(`http://localhost:3000/Books/${id}/comments`,{comment:comment,rating:rating},
          {headers: {
            authorization: `Bearer ${user.token}`
          }})
        .then((res)=>{
            console.log(res.data.comments[0])
            setComments((prevComments) => [res.data.comments[0], ...prevComments]);
            console.log("Posted success")
        })
        .catch((err)=>{
            console.log("error in posting the comment "+err)
        })
        }
    }
    return (
        <div style={{margin:"0px 48px"}}>
                <Accordion className='mb-3'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography >Write a comment</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack spacing={2}>
                                <TextField id="standard-basic" label="Start writing..." variant="standard" onChange={(e) => setComment(e.target.value)} />
                                <div className='rating'>
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label key={i}>
                                                <input type="radio" name="rating" 
                                                     value={ratingValue} 
                                                     onClick={() => setRating(ratingValue)}
                                                    />
                                                <i className="fa-solid fa-star" 
                                                   style={{ color: ratingValue <= (hover||rating) ? 'gold' : 'grey' }}
                                                   onMouseOver={()=>{setHover(ratingValue)}}
                                                   onMouseOut={()=>{setHover(null)}}
                                                   ></i>
                                            </label>
                                        );
                                    })}
                                     <Button class="btn-succes ms-5" onClick={()=>{handlePost()}} style={{width:"100px"}}>POST</Button>
                                </div>
                               
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            
            <div>

                {
                    (comments && comments.length > 0) ? (comments.map((comment) => {
                        return (
                            <div key={comment._id} className="mb-2">
                                <h5 className="mb-1"><i class="fa-solid fa-user me-2"></i>{comment.author.username}</h5>
                                <p className="mb-0">{comment.comment}</p>
                                <p className="mb-2">{comment.rating}<i className="fa-solid fa-star" style={{'color':'gold'}}></i></p>
                            </div>
                        );
                    })
                    ):<div align="center">No comments </div>
                }
            </div>
        </div>
    )
}

export default CommentComponent