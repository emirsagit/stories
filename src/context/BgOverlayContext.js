import React, { useState } from 'react'

export const BgOverlayContext = React.createContext({});

export const BgOverleyContextProvider = ({ children }) => {
    const [showBgOverlay, setShowBgOverlay] = useState(false);

    const handleOverlayClick = () => {
        setShowBgOverlay(!showBgOverlay)
    }

    return (
        <BgOverlayContext.Provider value={{ showBgOverlay, handleOverlayClick }}>
            {children}
        </BgOverlayContext.Provider>
    )
}

