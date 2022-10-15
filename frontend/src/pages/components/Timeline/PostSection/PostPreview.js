import React from 'react'
import styles from 'styles/css/PostPreview.module.css'
import {ReactComponent as MoreIcon} from 'assets/icons/ellipsis.svg'
import {ReactComponent as CommentIcon} from 'assets/icons/comment.svg'
import {ReactComponent as RetweetIcon} from 'assets/icons/retweet.svg'
import {ReactComponent as LikeIcon} from 'assets/icons/like-outlined.svg'
import {ReactComponent as LikeFilledIcon} from 'assets/icons/like-filled.svg'
import {ReactComponent as ShareIcon} from 'assets/icons/share.svg'
import ReactTimeAgo from 'react-time-ago'





function PostPreview({
  displayName = 'Display Name',
  username='username',
  time=undefined,
  text='Post content.',
  images=[],
  video=null,
  comments=0,
  likes=0,
  retwadds=0
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
                <span className={`body ${styles.greyText}`}>@{username}&nbsp;·&nbsp;<ReactTimeAgo date={time} locale="en-US" timeStyle="twitter"/></span>
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
        {images.length > 0 && <div className={styles.media}>
          {images.length !== 3 && images.map((i,ind)=> <img className={styles.image} key={ind} src={i} alt=''/>)}
          {images.length === 3 &&
          <>
            <img className={styles.image} src={images[0]} alt=''/>
            <div className={styles.col}>
              <img className={styles.image} src={images[1]} alt=''/>
              <img className={styles.image} src={images[2]} alt=''/>
            </div>
          </>
          }
        </div>}
        <div className={styles.actions}>
          <div className={`${styles.action} ${styles.commentAction}`}>
            <div className={styles.commentButton}><CommentIcon/></div>
            <span className={`subText ${styles.actionText}`}>{comments}</span>
          </div>
          <div className={`${styles.action} ${styles.retwaddAction}`}>
            <div className={styles.retwaddButton}><RetweetIcon/></div>
            <span className={`subText ${styles.actionText}`}>{retwadds}</span>
          </div>
          <div className={`${styles.action} ${styles.likeAction}`}>
            <div className={styles.likeButton}><LikeIcon/></div>
            <span className={`subText ${styles.actionText}`}>{likes}</span>
          </div>
          <div className={styles.shareButton}><ShareIcon/></div>
        </div>
      </div>
    </>
  )
}

export default PostPreview