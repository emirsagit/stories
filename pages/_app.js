import { BgOverleyContextProvider } from "src/context/BgOverlayContext";
import "../styles/globals.css";
import firebase from "../utils/firebase/firebaseClient";

function MyApp({ Component, pageProps }) {

    return (
      <BgOverleyContextProvider>
        <Component {...pageProps} />
      </BgOverleyContextProvider>
    );
  }

export default MyApp;
