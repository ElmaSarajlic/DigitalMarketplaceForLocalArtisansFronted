import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Comment } from '../../utils/types';

type Props = {
  comment: Comment;
};

const CommentCard: React.FC<Props> = ({ comment }) => { 
  return (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 2 }}>
          {comment.userId ? comment.userId[0].toUpperCase() : 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {comment.userId || "Unknown User"}
          </Typography>
          <Typography variant="body2">
            {comment.text}
          </Typography>
          {comment.creationDate && ( 
            <Typography variant="caption" color="text.secondary">
              {new Date(comment.creationDate).toLocaleDateString()} at {new Date(comment.creationDate).toLocaleTimeString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
