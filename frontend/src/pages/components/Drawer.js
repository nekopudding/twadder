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
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchApi } from 'utils/fetch-api'
import { getCookie } from 'utils/cookies'

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
  const [user,setUser] = useState({
    displayName: 'Display Name',
    username: 'username'
  })

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchApi(`/me/profile`,'GET',{sessionId: getCookie('sessionId')});
      const {msg,...profile} = await res.json();
      // if (msg) setToast(prev => {return {update: !prev.update, msg: msg}});
      if (res.status === 200)
        setUser({
          displayName: profile.name,
          username: profile.username
        })
    }
    getProfile();
  },[])
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
              <div className='bodyHeader'>{user.displayName}</div>
              <div className='body'>@{user.username}</div>
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