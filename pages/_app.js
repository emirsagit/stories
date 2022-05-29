import { BgOverleyContextProvider } from "../src/context/BgOverlayContext";
import { CategoryProvider } from "../src/context/CategoryContext";
import { AuthProvider } from "../src/context/FirebaseAuthContext";
import { MessageProvider } from "../src/context/MessageContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <MessageProvider>
      <AuthProvider>
        <CategoryProvider>
          <BgOverleyContextProvider>
            <Component {...pageProps} />
          </BgOverleyContextProvider>
        </CategoryProvider>
      </AuthProvider>
    </MessageProvider>
  );
}

export default MyApp;
