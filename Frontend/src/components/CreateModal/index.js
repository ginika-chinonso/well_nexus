import React, { useState } from 'react';
import './Modal.css';
import Btn from '@ui/Btn';
import { WellNexusAddress } from '@constants/address';
import {abi} from '@constants/wellnexusabi';
import { useWriteContract } from 'wagmi'


const Modal = (props) => {
  const { writeContract } = useWriteContract()
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

 

  const handleSubmit = (e) => {
    e.preventDefault();
    writeContract({ 
      abi,
      address: WellNexusAddress,
      functionName: 'register_user',
      args: [
        name,
        'imagurltest',
        gender,
        'dev'
      ],
   })
    console.log('clicked')
  };
  
  return (
    <div>
      {/* <button onClick={toggleModal}>Open Modal</button> */}
      {props.open && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={props.close}>&times;</span>
            
            <h2 className='headtext'>Enter Your Name</h2>
            <div>
              
            </div>
            <form onSubmit={handleSubmit} className='formss'>
              <input
                type="text"
                placeholder="Input a username to start"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='textbox'
              />
              <input
                type="text"
                placeholder="Input your gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className='textbox'
              />
              {/* <button type="submit"> Submit</button> */}
              <Btn text="Sign up" type="submit"/>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
