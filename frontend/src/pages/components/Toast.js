/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'
import { useState,useRef,useEffect } from 'react';
import styles from '../../styles/css/Toast.module.css'

function Toast(props) {
  const {duration = '3s',fadeOutTime = '0.5s'} = props;

  const toastRef = useRef(null);

  const runAnimation = () => {
    toastRef.current.classList.remove(styles.fadeOut);
    void toastRef.current.offsetWidth;
    toastRef.current.classList.add(styles.fadeOut);
  }
  useEffect(()=> {
    runAnimation()
  },[props.toast])
  return (
    <>
      <div ref={toastRef} className={`${styles.container} ${styles.fadeOut}`} css={css`
        animation-delay: ${duration} !important;
        animation-duration: ${fadeOutTime} !important;
      `}>
        {props.toast.msg}
      </div>
    </>
  )
}

export default Toast