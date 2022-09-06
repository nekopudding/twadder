import React from 'react'
import styles from 'styles/css/Drawer.module.css'
import {ReactComponent as Logo} from 'assets/icons/twitter.svg'
import {ReactComponent as HomeIcon} from 'assets/icons/home.svg'
import {ReactComponent as BellIcon} from 'assets/icons/bell.svg'
import {ReactComponent as EnvelopeIcon} from 'assets/icons/envelope.svg'
import {ReactComponent as UserIcon} from 'assets/icons/user.svg'
import {ReactComponent as MoreIcon} from 'assets/icons/ellipsis-circle.svg'
import { Link } from 'react-router-dom'

const linkList = [
  {
    icon: <HomeIcon/>,
    text: 'Home',
    to: '/home'
  },
  {
    icon: <BellIcon/>,
    text: 'Notifications',
    to: '/notifications'
  },
  {
    icon: <EnvelopeIcon/>,
    text: 'Messages',
    to: '/messages'
  },
  {
    icon: <UserIcon/>,
    text: 'Profile',
    to: '/profile'
  },
  {
    icon: <MoreIcon/>,
    text: 'More',
    to: null
  },
]

function Drawer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.linkList}>
            <div className={styles.listItem}>
              <div className={styles.icon}><Logo/></div>
            </div>
            {linkList.map(l => {
              return ( 
                l.to ? 
                <Link className={styles.listItem} key={l.text} to={l.to}>
                  <div className={styles.icon}>{l.icon}</div>
                  <div className={`input ${styles.text}`}>{l.text}</div>
                </Link>
                :
                <div className={styles.listItem} key={l.text}>
                  <div className={styles.icon}>{l.icon}</div>
                  <div className={`input ${styles.text}`}>{l.text}</div>
                </div>
              )
            })}
            
        </div>
      </div>
    </>
  )
}

export default Drawer