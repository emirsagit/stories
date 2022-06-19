import { BgOverleyContextProvider } from "../src/context/BgOverlayContext";
import { CategoryProvider } from "../src/context/CategoryContext";
import { AuthProvider } from "../src/context/FirebaseAuthContext";
import { FollowProvider } from "../src/context/FollowContext";
import { MessageProvider } from "../src/context/MessageContext";
import "../styles/globals.css";
import { polyfill } from 'interweave-ssr';


function MyApp({ Component, pageProps }) {
  
  polyfill();
  
  return (
    <MessageProvider>
      <AuthProvider>
        <FollowProvider>
          <CategoryProvider>
            <BgOverleyContextProvider>
              <Component {...pageProps} />
            </BgOverleyContextProvider>
          </CategoryProvider>
        </FollowProvider>
      </AuthProvider>
    </MessageProvider>
  );
}

export default MyApp;
