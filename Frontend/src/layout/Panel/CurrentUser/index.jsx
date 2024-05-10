// styled components
import {Menu, UserWrapper} from '../style';

// components
import Avatar from '@ui/Avatar';

// utils
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {useState} from 'react';

// assets
import doc1jpg from '@assets/avatars/avatarimage.png';

import { ConnectButton } from '@rainbow-me/rainbowkit';

  import React from 'react'
  import CreateModal from '@components/CreateModal';

const CurrentUser = () => {
    const [open, setOpen] = useState(false);
    const handleClickAway = () => setOpen(false);
    const handleClick = () => setOpen(!open);


    const src = {
        jpg: doc1jpg,
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
    //fetch users name and participant status, whether he's a therapist or patient.
    return (
        <>
        <ClickAwayListener onClickAway={handleClickAway}>
            <UserWrapper>
                <Avatar avatar={src} alt="avatar"/>
                <div className="info">
                    <span className="h3">Akinbola Kehinde</span>
                    <span className="position">User</span>
                    <Menu className={open ? 'visible' : ''}>
                        <ConnectButton chainStatus="none"  />
                        <button onClick={toggleModal} >
                            <i className="icon icon-circle-user"/> Sign Up
                        </button>
                    </Menu>
                </div>
                <button className="trigger" onClick={handleClick} aria-label="Show menu">
                    <i className="icon icon-chevron-down" />
                </button>
            </UserWrapper>
        </ClickAwayListener>
        <CreateModal open={isOpen} close={toggleModal}/>
        </>
    )
}

export default CurrentUser;