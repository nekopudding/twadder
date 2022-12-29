import React from 'react'
import { useState } from 'react';
import styles from 'styles/css/Messages.module.css'
import {ReactComponent as SendIcon} from 'assets/icons/paper-plane-regular.svg'
import {ReactComponent as PhotoIcon} from 'assets/icons/media.svg'
import {ReactComponent as GIFIcon} from 'assets/icons/gif.svg'
import {ReactComponent as EmojiIcon} from 'assets/icons/emoji.svg'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import { useRef } from 'react';
import { useEffect } from 'react';

const MessageInput = ({
  sendMessage
}) => {
  const [images,setImages] = useState([]);
  const [text,setText] = useState('');
  const updateText = (e)=>setText(e.target.value);
  const imageInputRef = useRef();

  const triggerImageClick = () => {
    imageInputRef.current.click();
  }

  const addImages = (e) => {
    const newImages = e.target.files;
    setImages([...images,...newImages]);
    e.target.value = null;
  }
  const send = (e) => {
    sendMessage(text);
    setText('');
  }
  const sendOnEnter = (e) => {
    if (e.key === 'Enter') send();
  }
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
          <input type="text"  
            className={`body ${styles.input}`} 
            placeholder='Start a new message'
            value={text}
            onChange={updateText}
            onKeyDown={sendOnEnter}
          />
          <div className={styles.iconContainer} onClick={send}>
            <div className={styles.icon}><SendIcon/></div>
          </div>
        </div>
      </div>
  )
}

export default MessageInput