import React from 'react';
import { useState } from 'react';
import { ReactComponent as MenuIcon } from "../assets/icons/Menu.svg"
import { ReactComponent as XIcon } from "../assets/icons/X.svg"

const Menu = ({ contents }) => {
    const [button, setButton] = useState(<MenuIcon />);
    const [isOpened, toggle] = useState();
    function toggleMenu () {
        if (isOpened) {
            toggle(false);
            setButton(<MenuIcon />);
        }
        else {
            toggle(true);
            setButton(<XIcon />);
        }
    }
    return (
        <>
            <button onClick={toggleMenu} className="button-header">
                {button}
            </button>
            <div className={(isOpened ? "visible " : "" ) + "modal-background"}>
                <div className="window">
                    {contents}
                </div>
            </div>
        </>
    )
}

export default Menu;