import React from 'react'
import { Grid } from '@material-ui/core'
import OutlinedCard from './OutlinedCard'
import Paper from '@material-ui/core/Paper';

export default class CardDeck extends React.Component<any,any> {

    render() {


        return (
            <div>

                <Grid container justify="center">           
                    <Grid item xs={2}>
                        <OutlinedCard />
                    </Grid>
                    <Grid item xs={2}>
                        <OutlinedCard />
                    </Grid>
                    <Grid item xs={2}>
                        <OutlinedCard />
                    </Grid>
                    <Grid item xs={2}>
                        <OutlinedCard />
                    </Grid>
                    </Grid>
               

            </div>
        )

    }
}



