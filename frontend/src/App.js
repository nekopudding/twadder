import Drawer from "pages/components/Drawer";
import Toast from "pages/components/Toast";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import styles from 'styles/css/App.module.css'
import { getCookie } from 'utils/cookies'
import { useDispatch, useSelector } from "react-redux";
import { setCurrUser } from "app/currUserSlice";
import { setToast } from "app/toastSlice";
import axios from "axios";
import { baseURL } from "utils/fetch-api";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

function App() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  useEffect(() => {
    dispatch(setToast({update: true, msg:''})); //reset toast message

    const getProfile = async () => {
      try {
        const sessionId = getCookie('sessionId');
        console.log(`sessionId: ${sessionId}`);
        const res = await axios({
          method: 'get',
          url: `${baseURL}/me/profile`,
          params: {sessionId}
        });
        const {msg,profile} = res.data;
        if (res.status === 200) {
          console.log('user is logged in');
          dispatch(setCurrUser({...profile}))
        }
      }catch (err) {
        console.log(err);
        window.location.href = '/signup'
      }
    } 
    getProfile();
  },[])
  return (
    <>
    <div className={styles.page}>
    <div className={styles.layout}>
        <Drawer/>
        <Outlet/>
      </div>
    </div>
    <Toast duration='2s' fadeOutTime='0.5s'/>
    </>
  );
}

export default App;
