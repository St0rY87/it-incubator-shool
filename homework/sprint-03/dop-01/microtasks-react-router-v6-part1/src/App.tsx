import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import styles from "./components/Site.module.css";
import { PageOne } from "./components/pages/PageOne";
import { PageThree } from "./components/pages/PageThree";
import { PageTwo } from "./components/pages/PageTwo";
import { Error404 } from "./components/pages/Error404";

export const App = () => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) => 
  isActive ? styles.activeNavLink : styles.navLink;
  return (
    <BrowserRouter>
      <div>
        <div className={styles.header}>
          <h1>HEADER</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.nav}>
            <ul>
              <li>
                <NavLink to={"/pageOne"}  className={navLinkClassName}>
                  Page 1
                </NavLink>
              </li>
              <li>
                <NavLink to={"/pageTwo"} className={navLinkClassName}>
                  Page 2
                </NavLink>
              </li>
              <li>
                <NavLink to={"/pageThree"}  className={navLinkClassName}>
                  Page 3
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Navigate to="/pageOne" />} />
              <Route path="/pageOne" element={<PageOne />} />
              <Route path="/pageTwo" element={<PageTwo />} />
              <Route path="/pageThree" element={<PageThree />} />
              <Route path="/error404" element={<Error404 />} />
              <Route path="*" element={<Navigate to="/error404" />} />
            </Routes>
          </div>
        </div>
        <div className={styles.footer}>abibas 2023</div>
      </div>
    </BrowserRouter>
  );
};
