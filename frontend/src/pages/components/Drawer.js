import React from 'react'
import styles from 'styles/css/Drawer.module.css'
import {ReactComponent as Logo} from 'assets/icons/twitter.svg'
import {ReactComponent as HomeIcon} from 'assets/icons/home.svg'
import {ReactComponent as BellIcon} from 'assets/icons/bell.svg'
import {ReactComponent as EnvelopeIcon} from 'assets/icons/envelope.svg'
import {ReactComponent as UserIcon} from 'assets/icons/user.svg'
import {ReactComponent as MoreCircleIcon} from 'assets/icons/ellipsis-circle.svg'
import {ReactComponent as MoreIcon} from 'assets/icons/ellipsis.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
    icon: <MoreCircleIcon/>,
    text: 'More',
    to: null
  },
]

function Drawer() {
  const {username,displayName} = useSelector(state=>state.currUser);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.linkList}>
          <div>
            <Link className={`${styles.linkGlow} ${styles.logo}`} to='/home'>
              <div className={`${styles.link}`}>
                <div className={styles.icon}><Logo/></div>
              </div>
            </Link>
          </div>
          {linkList.map(l => {
            return ( 
              l.to ? 
              <Link className={styles.linkGlow} key={l.text} to={l.to}>
                <div className={styles.link}>
                  <div className={styles.icon}>{l.icon}</div>
                  <div className={`input ${styles.text}`}>{l.text}</div>
                </div>
              </Link>
              :
              <div className={styles.linkGlow} key={l.text}>
                <div className={styles.link}>
                  <div className={styles.icon}>{l.icon}</div>
                  <div className={`input ${styles.text}`}>{l.text}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.button}>
          <div className='sidebarButton'>Twadd</div>
        </div>
        <div className={styles.accountButtonContainer}>
          <div className={styles.accountButton}>
            <div className={styles.avatar}></div>
            <div className={styles.textContainer}>
              <div className='bodyHeader'>{displayName}</div>
              <div className='body'>@{username}</div>
            </div>
            <div className={styles.icon}><MoreIcon/></div>
          </div>
        </div>
        
      </div>
      <div className={styles.containerOffset}></div>
    </>
  )
}

export default Drawer