/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import { useState } from 'react'
import { useEffect } from 'react';

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
  const [selected,setSelected] = useState(-1);

  useEffect(() => {
    const urlArr = window.location.pathname.split('/');
    if (urlArr[1] === '') return setSelected(0);
    let isSet = false;
    linkList.forEach((l,index) => {
      if(urlArr[1] === l?.to?.substring(1)) {
        isSet = true;
        return setSelected(index);
      }
    })
    if (!isSet) return setSelected(-1);
    
  },[window.location.pathname])

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
          {linkList.map((l,index) => {
            const ListItem = () => {
              return (
                <div className={styles.link}>
                  <div className={styles.icon}>{l.icon}</div>
                  <div className={`input ${styles.text}`}
                    css={css`
                      font-weight: ${selected === index ? 700 : 400}
                    `}
                  >{l.text}</div>
                </div>
              )
            }
            return ( 
              l.to ? 
              <Link className={`${styles.linkGlow} ${selected === index ? styles.selected : ''}`} key={l.text} to={l.to}
                onClick={()=> setSelected(index)}
              >
                <ListItem />
              </Link>
              :
              <div className={styles.linkGlow} key={l.text}
                onClick={()=> setSelected(index)}
              >
                <ListItem/>
              </div>
            )
          })}
        </div>
        <button className={styles.button} onClick={()=> {window.scrollTo(0, 0)}}>
          <div className='sidebarButton'>Twadd</div>
        </button>
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