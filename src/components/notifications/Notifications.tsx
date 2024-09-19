import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  InputBase,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import useMessages from '../../hooks/useMessages';
import { SelectChangeEvent } from '@mui/material/Select'; 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ }) => ({
  m: 1,
  minWidth: 150,
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiSelect-select': {
    color: 'white',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
}));

const Notifications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const { data: messages } = useMessages();

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as string);
  };


  const filteredNotifications = messages
    ?.filter((messages) =>
      messages.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Notifications
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search notifications…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          <StyledFormControl variant="outlined">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange} 
              label="Sort by"
            >
              <MenuItem value="asc">Date (Oldest First)</MenuItem>
              <MenuItem value="desc">Date (Newest First)</MenuItem>
            </Select>
          </StyledFormControl>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Paper>
          <List>
            {filteredNotifications?.map((messages) => (
              <React.Fragment key={messages.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/* avatar*/}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={messages.title}
                    secondary={
                      <>
                        {messages.content}
                        <br />
                        <Typography variant="caption" color="textSecondary">
                          {new Date(messages.creationDate).toString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Notifications;
