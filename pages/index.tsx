import type { NextPage } from 'next'
import Head from 'next/head'
import Welcome from './welcome';
import styles from '../styles/home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Of Life</title>
        <meta name="description" content="" />
        <link rel="icon" href="" />
      </Head>
      <main className={styles.main}>
        <Welcome />
      </main>
    </div>
  )
}

export default Home
