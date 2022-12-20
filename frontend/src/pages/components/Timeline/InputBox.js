import React from 'react'
import styles from '../../../styles/css/Timeline.module.css'
import {ReactComponent as PhotoIcon} from '../../../assets/icons/media.svg'
import {ReactComponent as GIFIcon} from '../../../assets/icons/gif.svg'
import {ReactComponent as EmojiIcon} from '../../../assets/icons/emoji.svg'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import { autoResize } from 'utils/textarea-auto-resize'
import { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { baseURL, ins } from 'utils/fetch-api'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from 'app/toastSlice'

function InputBox() {
  const [images,setImages] = useState([]);
  const [text,setText] = useState('');
  const imageInputRef = useRef();
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

  const addImages = (e) => {
    const newImages = e.target.files;
    setImages([...images,...newImages]);
    e.target.value = null;
  }
  const triggerImageClick = () => {
    imageInputRef.current.click();
  }
  const removeImage = (index) => {
    const imgs = [...images];
    imgs.splice(index,1);
    setImages(imgs);
  }
  const uploadPost = async () => {
    try {
      if (images.length > 4) {
        return dispatch(setToast({update: !toast.update, msg: 'max 4 images allowed.'}))
      } 
      const fd = new FormData();
      images.forEach(i =>fd.append('images',i))
      fd.append('text',text);
      const res = await ins({
        method: 'post',
        url: `${baseURL}/posts`,
        data: fd
      });
      if (res.status === 200) {
        dispatch(setToast({update: !toast.update, msg: res.data.msg}));
        setImages([])
        setText('');
      }
    }catch (err) {
      dispatch(setToast({update: !toast.update, msg: err.response.data.msg || err.message}));
    }
  }
  const updateText = (e)=> {
    setText(e.target.value.trimLeft()) //removes leading spaces
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.avatar}></div>
        <div className={styles.inputEditor}>
          <textarea 
            className={`input ${styles.textarea}`} 
            name="input" 
            placeholder={`What's happening?`} 
            onInput={(e) => autoResize(e.target)}
            value={text}
            onChange={updateText}
          />
          {images.map((i,ind) => {
            console.log(i);
            return (
              <React.Fragment key={ind}>
              <div className={styles.imagePreviewContainer}>
                <div className={styles.removeButtonContainer} onClick={()=>removeImage(ind)}>
                  <div className={styles.icon}><CloseIcon/></div>
                </div>
                <img className={styles.imageInputPreview} src={URL.createObjectURL(i)} alt={i.name}/>
              </div>
              </React.Fragment>
            )
          })}
          <div className={styles.divider}/>
          <div className={styles.actionsContainer}>
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
            <button className={styles.button} onClick={uploadPost}>
              <span className='bodyHeader'>Twadd</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputBox