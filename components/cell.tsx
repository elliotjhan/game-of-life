import styles from './../styles/cell.module.css';

interface CellProps {
  status: number;
}

const Cell: React.FC<CellProps> = (props): JSX.Element => {
  if (props.status) {
    return <div className={styles.liveCell}></div>
  } else {
    return <div className={styles.deadCell}></div>
  }
}

export default Cell;
