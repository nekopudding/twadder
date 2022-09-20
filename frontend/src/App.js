import Drawer from "pages/components/Drawer";
import Toast from "pages/components/Toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import styles from 'styles/css/App.module.css'



function App() {
  return (
    <>
    <div className={styles.page}>
    <div className={styles.layout}>
        <Drawer/>
        <Outlet/>
      </div>
    </div>
    {toast.msg !== '' && <Toast toast={toast} duration='2s' fadeOutTime='0.5s'/>}
      
    </>
  );
}

export default App;
