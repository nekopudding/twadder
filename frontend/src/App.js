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
import { fetchApi } from 'utils/fetch-api'
import { getCookie } from 'utils/cookies'
import { useDispatch } from "react-redux";
import { setCurrUser } from "app/currUserSlice";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchApi(`/me/profile?sessionId=${getCookie('sessionId')}`,'GET');
      if (!res) return;
      const {msg,...profile} = await res.json();
      if (res.status === 200)
        console.log('user is logged in');
        dispatch(setCurrUser({
          displayName: profile.name,
          username: profile.username
        }))
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
    {/* {toast.msg !== '' && <Toast toast={toast} duration='2s' fadeOutTime='0.5s'/>} */}
      
    </>
  );
}

export default App;
