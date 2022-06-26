import { BgOverleyContextProvider } from "../src/context/BgOverlayContext";
import { CategoryProvider } from "../src/context/CategoryContext";
import { AuthProvider } from "../src/context/FirebaseAuthContext";
import { FollowProvider } from "../src/context/FollowContext";
import { MessageProvider } from "../src/context/MessageContext";
import 'tailwindcss/tailwind.css'
import "../styles/globals.css";
import { polyfill } from 'interweave-ssr';
import { RecoilRoot } from "recoil";


function MyApp({ Component, pageProps }) {

  polyfill();

  return (
    <MessageProvider>
      <AuthProvider>
        <RecoilRoot>
          <FollowProvider>
            <CategoryProvider>
              <BgOverleyContextProvider>
                <Component {...pageProps} />
              </BgOverleyContextProvider>
            </CategoryProvider>
          </FollowProvider>
        </RecoilRoot>
      </AuthProvider>
    </MessageProvider>
  );
}

export default MyApp;
