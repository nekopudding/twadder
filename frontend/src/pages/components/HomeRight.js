import React from 'react'
import styles from 'styles/css/HomeRight.module.css'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'

function HomeRight() {
  return (
    <>
      <div className={styles.container}>
      <div className={`${styles.searchBar}`}>
        <div className={styles.icon}><SearchIcon/></div>
        <input type="text"  className={`body ${styles.input}`} placeholder='Search Twadder'/>
      </div>

        <div className={styles.whoToFollow}>
          <h2 className='h2'>Who to follow</h2>
        </div>
      </div>
    </>
  )
}

export default HomeRight