import React from 'react'
import styles from 'styles/css/PostPreview.module.css'
import {ReactComponent as MoreIcon} from 'assets/icons/ellipsis.svg'

function PostPreview({
  displayName,username,time,body,media
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}></div>
            <div className={styles.headerText}>
              <div>
                <span className={`bodyHeader ${styles.displayName}`}>Display Name</span>
                <span className={`body ${styles.greyText}`}>@username · 1h</span>
              </div>
              <div className={`body ${styles.bodyText}`}>Post content.</div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.moreIcon}>
              <MoreIcon/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostPreview