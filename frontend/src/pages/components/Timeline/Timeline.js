import React from 'react'
import styles from '../../../styles/css/Timeline.module.css'
import {ReactComponent as PhotoIcon} from '../../../assets/icons/media.svg'
import {ReactComponent as GIFIcon} from '../../../assets/icons/gif.svg'
import {ReactComponent as EmojiIcon} from '../../../assets/icons/emoji.svg'
import { autoResize } from 'utils/textarea-auto-resize'



function Timeline() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitleContainer}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.sectionTitleOffset}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.avatar}></div>
        <div className={styles.inputEditor}>
          <textarea className={`input ${styles.textarea}`} name="input" placeholder={`What's happening?`} onInput={(e) => autoResize(e.target)}/>
          <div className={styles.divider}/>
          <div className={styles.actionsContainer}>
            <div className={styles.inputOptionsContainer}>
              <div className={styles.iconContainer}>
                <div className={styles.icon}><PhotoIcon/></div>
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.icon}><GIFIcon/></div>
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.icon}><EmojiIcon/></div>
              </div>
            </div>
            <button className={styles.button}>
              <span className='bodyHeader'>Twadd</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline