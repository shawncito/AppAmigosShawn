import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';

import './styles.css';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/friends/${id}`)
      .then(response => {
        setFriend(response.data);
      })
      .catch(error => {
        console.error('Error fetching friend:', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/friends/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting friend:', error);
      });
  };

  return (
    <Container className='box_friend'>
      {friend ? (
        <div className='content_friend'>
          <img src={friend.image_url} alt={friend.name} />
          <Typography  className ='letras' variant="h4">{friend.name}</Typography>
          <Typography variant="h6">{friend.nickname}</Typography>
          <Typography variant="h6">{friend.is_best_friend ? 'Mejor amigo' : 'No es mejor amigo'}</Typography>
          <div className='buttons'>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Atras
          </Button>
          </div>
        </div>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Container>
  );
}
export default FriendDetail;




