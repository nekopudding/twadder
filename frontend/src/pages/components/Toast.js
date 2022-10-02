/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/css/Toast.module.css'

function Toast(props) {
  const {duration = '3s',fadeOutTime = '0.5s'} = props;
  const toast = useSelector(state => state.toast);

  const toastRef = useRef(null);

  const runAnimation = () => {
    toastRef.current.classList.remove(styles.fadeOut);
    void toastRef.current.offsetWidth;
    toastRef.current.classList.add(styles.fadeOut);
  }
  useEffect(()=> {
    runAnimation()
  },[toast])

  return (
    <>
      <div ref={toastRef} className={`${styles.container} ${styles.fadeOut}`} css={css`
        display: ${toast.msg === '' ? 'none' : 'block'};
        animation-delay: ${duration} !important;
        animation-duration: ${fadeOutTime} !important;
      `}>
        {toast.msg}
      </div>
    </>
  )
}

export default Toast