import styles from './../styles/row.module.css';
import Cell from './cell';

interface RowProps {
  columns: number[],
}

const Row: React.FC<RowProps> = (props): JSX.Element => {

  const createColumns = (): React.ReactElement[] => {
    let returnArray = [];
    for (let i = 0; i < props.columns.length; i++) {
      returnArray.push(<Cell key={i} status={props.columns[i]} />);
    }
    return returnArray;
  }

  return (
    <div className={styles.gridRow}>
      {props.columns ? createColumns() : null}
    </div>
  )
}

export default Row;
