import React from 'react'
import styles from 'styles/css/Messages.module.css'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'
import {ReactComponent as SendIcon} from 'assets/icons/paper-plane-regular.svg'
import {ReactComponent as PhotoIcon} from 'assets/icons/media.svg'
import {ReactComponent as GIFIcon} from 'assets/icons/gif.svg'
import {ReactComponent as EmojiIcon} from 'assets/icons/emoji.svg'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import ReactTimeAgo from 'react-time-ago'
import { useState } from 'react'
import { useRef } from 'react'

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
const fillerMessageList = [
 {
  username: 'dakuro',
  dateSent: new Date(),
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque, augue et porttitor dignissim, massa neque vulputate tortor, sodales congue magna sem eu mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed tempus nisl massa, vitae interdum odio cursus non. Etiam tincidunt volutpat leo eget scelerisque. Aenean varius ut diam id tincidunt. Vivamus commodo mi id vehicula ultricies. Proin in augue varius, egestas nunc eu, aliquam augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam varius consectetur nibh a consequat. Aliquam tellus risus, facilisis non leo a, euismod ullamcorper dui. Fusce facilisis ipsum vitae lorem aliquam volutpat. Nam eget urna sodales, accumsan enim ac, pulvinar libero. Phasellus luctus cursus velit, in scelerisque elit. Nam eget arcu nec turpis molestie porttitor. Phasellus neque lectus, fringilla vitae pellentesque id, vestibulum eu purus.'
 },
 {
  username: 'dakuro',
  dateSent: new Date(),
  text: 'Lorem ipsum.'
 }
]

function Messages() {
  const [images,setImages] = useState([]);
  const [text,setText] = useState('');
  const imageInputRef = useRef();

  const triggerImageClick = () => {
    imageInputRef.current.click();
  }

  const addImages = (e) => {
    const newImages = e.target.files;
    setImages([...images,...newImages]);
    e.target.value = null;
  }

  const MessageInput = () => {
    return (
      <div className={styles.messageInput}>
          <div className={`${styles.messageInputBox}`}>
            <div className={styles.inputOptionsContainer}>
              <div className={styles.iconContainer} onClick={triggerImageClick}>
                <div className={styles.icon}><PhotoIcon/></div>
                <input 
                  ref={imageInputRef}
                  className={styles.imageUploadInput} 
                  type="file" name="images" 
                  accept=".png,.jpg,.jpeg,.webp" 
                  multiple
                  onChange={addImages}
                />
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.icon}><GIFIcon/></div>
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.icon}><EmojiIcon/></div>
              </div>
            </div>
            <input type="text"  className={`body ${styles.input}`} placeholder='Start a new message'/>
            <div className={styles.iconContainer}>
              <div className={styles.icon}><SendIcon/></div>
            </div>
          </div>
        </div>
    )
  }

  return (
    <>
      <div className={styles.userList}>
        <div className={styles.sectionTitleContainer}>
          <h2 className='h2'>Messages</h2>
        </div>
        <div className={styles.sectionTitleOffset}></div>
        <div className={`${styles.searchBar}`}>
          <div className={styles.icon}><SearchIcon/></div>
          <input type="text"  className={`body ${styles.input}`} placeholder='Search Direct Messages'/>
        </div>
        {fillerUserList.map(u => {
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
      <div className={styles.chatbox}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={styles.chatboxTitle}>Dakuro</h2>
        </div>
        <div className={styles.sectionTitleOffset}></div>
        <div className={styles.chat}>
          {fillerMessageList.map((msg) => {
            return (<>
            <div className={styles.messageContainer}>
              <p className={`body ${styles.message}`}>
                {msg.text}
              </p>
            </div>
            </>)
          })}
        </div>
        <MessageInput/>
      </div>
    </>
  )
}

export default Messages