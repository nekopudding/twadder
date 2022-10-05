import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchApi } from 'utils/fetch-api';
import { Buffer } from 'buffer';

function ImageTest() {
  const [base64Images,setBase64Images] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await fetchApi('/image','GET');
      const imageArray = await res.json();
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

  return (
    <>
      <div>ImageTest</div>
      <input type="file" name="" id="" />
      <button onClick={fetchImages} style={{background: 'white'}}>Fetch Image</button>
      {base64Images.map((img,i) => {
        return (
          <img key={i} src={`data:image/png;base64,${img}`} alt='' />
        )
      })}
    </>
  )
}

export default ImageTest