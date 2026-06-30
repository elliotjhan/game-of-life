import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styles from '../styles/start.module.css'

const Start: NextPage = () => {
  const [rows, setRows] = useState<string>("");
  const [columns, setColumns] = useState<string>("");

  const setDimensions = (event: SelectChangeEvent) => {
    if (event.target.name === 'rows') {
      setRows(event.target.value);
    } else if (event.target.name === 'columns') {
      setColumns(event.target.value);
    }
  }

  const StartButton = () => {
    if (rows && columns) {
      return (
        <Link
          href={{
            pathname: "/game",
            query: {
              rows,
              columns
            }
          }}
        >
          <Button size='large' variant='outlined'>Start</Button>
        </Link>
      )
    } else {
      return (
        <Button size='large' variant='outlined'>Start</Button>
      )
    }
  }

  return (
    <Box className={styles.container}>
      <Grid rowSpacing={6} justifyContent={'center'} container spacing={2}>
        <Grid textAlign={'center'} item xs={1}>
          <FormControl variant="standard" style={{ minWidth: 120 }}>
            <InputLabel id="select-grid-dimensions">Rows</InputLabel>
            <Select name="rows" value={rows} labelId="select-grid-dimensions" label="Select" onChange={setDimensions}>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="70">70</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid textAlign={'center'} item xs={1}>
          <FormControl variant="standard" style={{ minWidth: 120 }}>
            <InputLabel id="select-grid-dimensions">Columns</InputLabel>
            <Select name="columns" value={columns} labelId="select-grid-dimensions" label="Select" onChange={setDimensions}>
              <MenuItem value="70">70</MenuItem>
              <MenuItem value="80">80</MenuItem>
              <MenuItem value="90">90</MenuItem>
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="110">110</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='center'>
            <StartButton />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Start;