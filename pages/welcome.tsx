import type { NextPage } from 'next';
import Link from 'next/link'
import Button from '@mui/material/Button';
import styles from './../styles/welcome.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Welcome: NextPage = () => {
  return (
    <Box>
      <Grid container rowSpacing={5}>
        <Grid item xs={12}>
          <div className={styles.title}>Conway's Game Of Life</div>
        </Grid>
        <Grid item xs={12}>
          Welcome to my interactive platform where you can explore the Game of Life, a zero-player game created by the famous mathematician John Horton Conway. <br />
          Read more about him and the history of the game <a target='_blank' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>here</a>
        </Grid>
        <Grid item>
          <Link href='/start'>
            <Button size='large' variant='outlined'>Traditional Game</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link
            href={{
              pathname: '/game',
              query: {
                rows: 50,
                columns: 90,
                presetGrid: 'gosper'
              }
            }}
          >
            <Button size='large' variant='outlined'>Gosper Glider Gun</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Welcome;