import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Person from '@material-ui/icons/Person';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop : 2,
    marginBottom : 2,
    overflowY : 'auto',
    maxHeight : 372

  },
}));
let selected = null;
export default function ChatList() {
  const classes = useStyles();
  
  const chatListHandle = (target) =>{
    if(selected != null){
      selected.style.backgroundColor = 'white';
    }
    while(target.tagName != 'LI'){
      target = target.parentNode;
    }
    target.style.backgroundColor = '#00bcd4';
    selected = target;
    
  }
  return (
      <Paper variant='outlined'>

    <List className={classes.root} >
        <CardActionArea onClick={(event)=>{
            chatListHandle(event.target);
            this.props.messageListHandle();
        }}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="امید داور" secondary="9 فروردین" />
      </ListItem>
      </CardActionArea>
      <CardActionArea onClick={(event)=>{
            chatListHandle(event.target);
            this.props.messageListHandle();
        }}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="احمد منصوری" secondary="9 فروردین" />
      </ListItem>
      </CardActionArea>
    </List>
    </Paper>
  );
}