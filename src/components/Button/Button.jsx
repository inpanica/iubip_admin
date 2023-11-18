import { useState } from 'react';
import './Button.css'

function Button({ children, handleClick, ...props }) {


    const mouseMove = (e) => {
        const buttonRect = e.target.getBoundingClientRect();
        const x = e.clientX - buttonRect.left;
        const y = e.clientY - buttonRect.top;
        e.target.style.setProperty('--mouse-x', x + "px")
        e.target.style.setProperty('--mouse-y', y + "px")
    }

    return (
        <button {...props}
            onClick={handleClick}
            className={[props.className, 'button'].join(' ')}
            type={props.type ? props.type : 'button'}
            onMouseMove={(e) => { mouseMove(e) }}>
            {children}
        </button>
    )
}

export default Button;