import "../styles/global.css";
import Home from "./index";
import Contacts from "./contacts";
import Drawer from "../components/Drawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  /* Exclude side bar from home page*/
  if (Component == Home || Component == Contacts) {
    return <Component {...pageProps} />;
  }
  return (
    <Drawer>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Component {...pageProps} />
    </Drawer>
  );
}
