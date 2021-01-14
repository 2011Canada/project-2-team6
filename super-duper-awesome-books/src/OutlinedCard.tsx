import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props: any) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  //let url = props.book.imgUrl

  return (
    
    <Card style={{backgroundColor: "gray", width: "10rem"}} variant="outlined">
      <CardContent>
  <img src="http://books.google.com/books/content?id=_i6bDeoCQzsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </CardContent>
     
      <CardActions style={{display: "flex", justifyContent: "center"}}>
       <Button size="small">Read</Button>
        </CardActions>
  
    </Card>

  );
}
