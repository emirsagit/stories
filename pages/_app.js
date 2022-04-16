import { BgOverleyContextProvider } from "../src/context/BgOverlayContext";
import { AuthProvider } from "../src/context/FirebaseAuthContext";
import { MessageProvider } from "../src/context/MessageContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <MessageProvider>
      <AuthProvider>
        <BgOverleyContextProvider>
          <Component {...pageProps} />
        </BgOverleyContextProvider>
      </AuthProvider>
    </MessageProvider>
  );
}

export default MyApp;
