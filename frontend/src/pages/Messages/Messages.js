import React from 'react'
import styles from 'styles/css/Messages.module.css'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'
import {ReactComponent as EnvelopeIcon} from 'assets/icons/envelope.svg'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'

import ReactTimeAgo from 'react-time-ago'
import { useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import MessageInput from './MessageInput'

const fillerUserList = [
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },
  {
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },{
    id: Math.random(),
    username: 'asdf',
    displayName: 'IM BOT',
    lastMessage: {
      datetime: '2022-12-12',
      content: 'Lorem Ipsum blah'
    }
  },

]

//list should be sorted to have newest first
const fillerMessageList = [
//   {
//     username: 'dean',
//     dateSent: new Date(),
//     text: 'wtf r u sayin'
//   },
//   {
//   username: 'dakuro',
//   dateSent: new Date(),
//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque, augue et porttitor dignissim, massa neque vulputate tortor, sodales congue magna sem eu mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed tempus nisl massa, vitae interdum odio cursus non. Etiam tincidunt volutpat leo eget scelerisque. Aenean varius ut diam id tincidunt. Vivamus commodo mi id vehicula ultricies. Proin in augue varius, egestas nunc eu, aliquam augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam varius consectetur nibh a consequat. Aliquam tellus risus, facilisis non leo a, euismod ullamcorper dui. Fusce facilisis ipsum vitae lorem aliquam volutpat. Nam eget urna sodales, accumsan enim ac, pulvinar libero. Phasellus luctus cursus velit, in scelerisque elit. Nam eget arcu nec turpis molestie porttitor. Phasellus neque lectus, fringilla vitae pellentesque id, vestibulum eu purus.'
//  },
//  {
//   username: 'dakuro',
//   dateSent: new Date(),
//   text: 'Lorem ipsum.'
//  },
//  {
//   username: 'dean',
//   dateSent: new Date(),
//   text: 'HIHI!!!'
//  },
]

function Messages() {
  const currUser = useSelector(state=>state.currUser);
  const [messageList,setMessageList] = useState(fillerMessageList);
  const [userList,setUserList] = useState(fillerUserList);
  const [dialogOpen,setDialogOpen] = useState(false);

  const sendMessage = (text) => {
    text = text.trim()
    if (text === '') return;
    setMessageList([{
      username: currUser.username, 
      dateSent: new Date(),
      text
    },...messageList])
  }

  const openDialog = () => {
    setDialogOpen(true);
  }

  return (
    <>
      <div className={styles.userListContainer}>
        <div className={styles.sectionTitleContainer}>
          <h2 className='h2'>Messages</h2>
          <div className={styles.iconButton} onClick={openDialog}><EnvelopeIcon/></div>
        </div>
        <div className={styles.sectionTitleOffset}></div>
        <div className={`${styles.searchBar}`}>
          <div className={styles.icon}><SearchIcon/></div>
          <input type="text"  className={`body ${styles.input}`} placeholder='Search Direct Messages'/>
        </div>
        
        <div className={styles.userList}>
          {userList.map(u => {
            return (
              <div className={styles.user} key={u.id}>
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
      </div>
      <div className={styles.chatbox}>
        {messageList.length > 0 ? 
          <>
            <div className={styles.sectionTitleContainer}>
              <h2 className={styles.chatboxTitle}>Dakuro</h2>
            </div>
            <div className={styles.sectionTitleOffset}></div>
            <div className={styles.chat}>
              {messageList.map((msg,i) => {
                return (
                <div className={styles.messageContainer} key={i}>
                  <p className={`body ${styles.message} ${currUser.username === msg.username && styles.myMessage}`}>
                    {msg.text}
                  </p>
                </div>
                )
              })}
            </div>
            <MessageInput sendMessage={sendMessage} />
          </>
          :
          <>
            <div className={styles.newConvo}>
              <div className={styles.container}>
                <h2 className={styles.title}>Select a message</h2>
                <p className={styles.subtext}>Choose from your existing conversations, start a new one, or just keep swimming.</p>
                <button className={`sidebarButton ${styles.button}`} onClick={openDialog}>
                  New message
                </button>
              </div>
            </div>
          </>
        }
      </div>
      <div className={styles.dialog}>
      
        <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.closeIconContainer} onClick={()=>setDialogOpen(false)}><CloseIcon/></div>
          <h2>New message</h2>
        </div>
        <button className={styles.nextButton} disabled>
          <span>Next</span>
        </button>
        
        </div>
      </div>
    </>
  )
}

export default Messages