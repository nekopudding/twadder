/**
 * Test code.
 * Used to test the image upload functionality for firebase.
 */
import React from 'react'
import { useState } from 'react'
import { baseURL, ins } from 'utils/fetch-api';
import { Buffer } from 'buffer';
import axios from 'axios';

function ImageTest() {
  const [base64Images,setBase64Images] = useState([]);
  const [imageToUpload,setImageToUpload] = useState()

  const fetchImages = async () => {
    try {
      const res = await ins({
        method: 'get',
        url: `${baseURL}/image`
      });
      const imageArray = res.data;
      const b64Arr = [];
      imageArray.forEach(i => {
        console.log(i);
        const base64 = Buffer.from(i.data).toString('base64')
        b64Arr.push(base64);
      })
      // console.log(b64Arr);
      setBase64Images(b64Arr);
    }catch(err) {
      console.log(err);
    }
  }
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImageToUpload(file);
  }

  const uploadImage = async () => {
    try {
      const fd = new FormData();
      console.log(imageToUpload)
      fd.append('image',imageToUpload);
      const res = await ins({
        method: 'post',
        url: `${baseURL}/image`,
        data: fd,
      })
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>ImageTest</div>
      <input type="file" name="" id="" onChange={handleChangeImage}/>
      <button onClick={uploadImage} style={{background: 'white'}} disabled={imageToUpload === undefined}>Upload Image</button>
      <button onClick={fetchImages} style={{background: 'white'}}>Fetch Image</button>
      {imageToUpload && <img src={URL.createObjectURL(imageToUpload)} alt='' style={{height: '400px'}}/>}
      {base64Images.map((img,i) => {
        return (
          <img key={i} src={`data:image/png;base64,${img}`} alt=''  style={{height: '400px'}}/>
        )
      })}
    </>
  )
}

export default ImageTest