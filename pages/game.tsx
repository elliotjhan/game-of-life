import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Row from '../components/row';
import styles from './../styles/game.module.css';

interface GameProps {
  rows: number,
  columns: number
}

const Game: React.FC<GameProps> = (): JSX.Element => {
  const router = useRouter();
  type Grid = number[][];
  type GridArgument = string | string[] | undefined;
  const [grid, setGrid] = useState<Grid>([]);

  useEffect(() => {
    createGrid(router.query.rows, router.query.columns, router.query.presetGrid);
  }, [])

  useInterval(() => {
    applyRules();
  }, 300);

  const createGrid = (rows: GridArgument, columns: GridArgument, presetGrid: GridArgument) => {
    let initializedGrid: Grid = [];
    let parsedRows: number;
    let parsedColumns: number;
    if (typeof rows === 'string' && typeof columns === 'string') {
      parsedRows = parseInt(rows);
      parsedColumns = parseInt(columns);
      if (presetGrid) {
        createPresetCells(initializedGrid, presetGrid);
      } else {
        createRandomCells(parsedRows, parsedColumns, initializedGrid);
      }
    }
  }

  const createRandomCells = (parsedRows: number, parsedColumns: number, initializedGrid: Grid) => {
    for (let i = 0; i < parsedRows; i++) {
      let newRow: number[] = [];
      for (let j = 0; j < parsedColumns; j++) {
        newRow.push(Math.round(Math.random()));
      }
      initializedGrid.push(newRow);
    }
    setGrid(initializedGrid);
  }

  const createPresetCells = (initializedGrid: Grid, presetGrid: GridArgument) => {
    let columns = 50;
    const gosperDataSet: any = {
      0: [],
      1: [24, 26],
      2: [22, 26],
      3: [14, 22, 35, 36],
      4: [13, 14, 15, 16, 21, 26, 35, 36],
      5: [1, 2, 12, 13, 15, 17, 22],
      6: [1, 2, 11, 12, 13, 15, 18, 22, 26],
      7: [12, 13, 15, 17, 24, 26],
      8: [13, 14, 15, 16],
      9: [14],
      10: [], 11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: [], 29: [], 30: [], 31: [], 32: [], 33: []
    }
    if (presetGrid === 'gosper') {
      for (let row in gosperDataSet) {
        let currentRow = gosperDataSet[row];
        let newRow: number[] = new Array(columns);
        newRow.fill(0, 0, columns);
        for (let i = 0; i < currentRow.length; i++) {
          newRow[currentRow[i]] = 1;
        }
        initializedGrid.push(newRow);
      }
    }
    setGrid(initializedGrid);
  }

  const applyRules = () => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let rows = grid.length;
    let columns = grid[0].length;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        let liveNeighbors = 0;
        let currentCell = grid[row][col];

        if (row > 0 && grid[row - 1][col]) liveNeighbors++; // top
        if (row > 0 && col < columns - 1 && grid[row - 1][col + 1]) liveNeighbors++; // top right
        if (col < columns - 1 && grid[row][col + 1]) liveNeighbors++; // right
        if (row < rows - 1 && col < columns - 1 && grid[row + 1][col + 1]) liveNeighbors++; // bottom right
        if (row < rows - 1 && grid[row + 1][col]) liveNeighbors++; // bottom 
        if (row < rows - 1 && col > 0 && grid[row + 1][col - 1]) liveNeighbors++; // bottom left
        if (col > 0 && grid[row][col - 1]) liveNeighbors++; // left
        if (row > 0 && col > 0 && grid[row - 1][col - 1]) liveNeighbors++; // top left

        if (liveNeighbors < 2 && currentCell) {
          newGrid[row][col] = 0;
        } else if (liveNeighbors > 3 && currentCell) {
          newGrid[row][col] = 0;
        } else if (liveNeighbors === 3 && !currentCell) {
          newGrid[row][col] = 1;
        }
      }
    }
    setGrid(newGrid);
  }

  const createRows = () => {
    let renderedRows = [];
    for (let i = 0; i < grid.length; i++) {
      renderedRows.push(<Row key={i} columns={grid[i]} />);
    }
    return renderedRows;
  }

  return (
    <div className={styles.gameContainer}>
      <div>
        {grid.length > 1 ? createRows() : null}
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button variant='outlined'>Back</Button>
        </Link>
      </div>
    </div>
  )
}

function useInterval(callback: Function, delay: number) {
  const savedCallback: { current: Function | undefined } = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Game;