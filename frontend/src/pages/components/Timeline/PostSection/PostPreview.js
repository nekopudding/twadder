import React from 'react'
import styles from 'styles/css/PostPreview.module.css'
import {ReactComponent as MoreIcon} from 'assets/icons/ellipsis.svg'
import {ReactComponent as CommentIcon} from 'assets/icons/comment.svg'
import {ReactComponent as RetweetIcon} from 'assets/icons/retweet.svg'
import {ReactComponent as LikeIcon} from 'assets/icons/like-outlined.svg'
import {ReactComponent as LikeFilledIcon} from 'assets/icons/like-filled.svg'
import {ReactComponent as ShareIcon} from 'assets/icons/share.svg'





function PostPreview({
  displayName = 'Display Name',
  username='username',
  time='null',
  text='Post content.',
  images=[],
  video=null
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}></div>
            <div className={styles.headerText}>
              <div>
                <span className={`bodyHeader ${styles.displayName}`}>{displayName}</span>
                <span className={`body ${styles.greyText}`}>@{username} · {time}h</span>
              </div>
              <div className={`body ${styles.bodyText}`}>{text}</div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.moreIcon}>
              <MoreIcon/>
            </div>
          </div>
        </div>
        <div className={styles.media}>
          {images.map((i,ind)=> <img className={styles.image} key={ind} src={i} alt=''/>)}
        </div>
        <div className={styles.actions}>
        <div className={styles.action}>
          <div className={styles.commentButton}><CommentIcon/></div>
          <span className={`subText ${styles.actionText}`}>0</span>
        </div>
          <div className={styles.retwaddButton}><RetweetIcon/></div>
          <div className={styles.likeButton}><LikeIcon/></div>
          <div className={styles.shareButton}><ShareIcon/></div>
        </div>
      </div>
    </>
  )
}

export default PostPreview