import React from 'react'
import styles from 'styles/css/Home.module.css'
import Drawer from '../../components/Drawer'
import HomeRight from './HomeRight'
import Timeline from './Timeline/Timeline'

function Home() {
  return (
    <>
      <div className={styles.container}>
        <Timeline/>
      </div>
      <div className={styles.container}>
        <HomeRight/>
      </div>
    </>
  )
}

export default Home