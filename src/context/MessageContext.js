import "react-toastify/dist/ReactToastify.css";
import { createContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {

    const showMessage = (message, status = "success", time = 3000) => {
        toast[status](message, {
            position: "top-right",
            theme: "colored",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    };

    return (
        <MessageContext.Provider
            value={{ showMessage }}
        >
            <ToastContainer />
            {children}
        </MessageContext.Provider>
    );
};