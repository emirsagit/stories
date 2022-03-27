import React, { useState } from 'react'
import styles from './bgoverlay.module.css';

export default function BgOverlay({ children, active, onClick }) {
    const [showBgOverlay, setShowBgOverlay] = useState(false);

    return (
        <>
            <div onClick={onClick} className={`${styles.BgLayout} g--z-2 ${active && styles.active}`}></div>
            {children}
        </>
    )
}
