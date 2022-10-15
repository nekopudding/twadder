import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { baseURL } from 'utils/fetch-api';
import PostPreview from './PostPreview'

function PostSection() {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const getPosts = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${baseURL}/posts`,
          params: { type: 'POSTS'}
        })
        setPosts(res.data.posts);
        console.log(res.data.msg);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  },[])
  return (
    <>
      {posts.map(p => {
        return (
          <PostPreview
            key={p.createdAt}
            displayName={p.displayName}
            username={p.username}
            time={p.createdAt}
            text={p.text}
            images={p.images}
          />
        )
      }
      )}
    </>
  )
}

export default PostSection