import React from 'react'
import styles from 'styles/css/Messages.module.css'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'
import ReactTimeAgo from 'react-time-ago'

const fillerUserList = [
  {
    id: '1',
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  }
]

function Messages() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sectionTitleContainer}>
          <h2 className='h2'>Messages</h2>
        </div>
        <div className={styles.sectionTitleOffset}></div>
        <div className={`${styles.searchBar}`}>
          <div className={styles.icon}><SearchIcon/></div>
          <input type="text"  className={`body ${styles.input}`} placeholder='Search Direct Messages'/>
        </div>
        {fillerUserList.map(u => {
          console.log(u)
          return (
            <div className={styles.user}>
              <div className={styles.avatar}></div>
              <div className={styles.headerText}>
                <div>
                  <span className={`bodyHeader ${styles.displayName}`}>{u.displayName}</span>
                  <span className={`body ${styles.greyText}`}>@{u.username}&nbsp;·&nbsp;<ReactTimeAgo date={new Date(u.lastMessage.datetime)} locale="en-US" timeStyle="twitter"/></span>
                </div>
                <div className={`body ${styles.bodyText}`}>{u.lastMessage.content}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Messages