import React from 'react'
import styles from 'styles/css/Home.module.css'
import Drawer from './components/Drawer'
import PostSection from './components/PostSection/PostSection'

function Home() {
  return (
    <>
      <div className={styles.layout}>
        <PostSection/>
      </div>
    </>
  )
}

export default Home