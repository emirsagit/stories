import "../styles/globals.css";
import firebase from "../utils/firebase/firebaseClient";

function MyApp({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
