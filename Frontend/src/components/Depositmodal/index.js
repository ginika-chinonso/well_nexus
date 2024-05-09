import React, { useState } from 'react';
import './Deposit.css';
import Btn from '@ui/Btn';
import { WellNexusAddress } from '@constants/address';
import {abi} from '@constants/wellnexusabi';
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'


const DepositModal = (props) => { 
  const {address} = useAccount()
  const { writeContract } = useWriteContract()
  const [amount, setamount] = useState('');
  
 

  const handleSubmit = (e) => {
    e.preventDefault();
    writeContract({ 
      abi,
      address: WellNexusAddress,
      functionName: 'deposit',
      args: [
        address,
        amount
      ],
      value: parseEther('0.0000000000000000001'),
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
            
            <h2 className='headtext'>Input Amount</h2>
            <div>
              
            </div>
            <form onSubmit={handleSubmit} className='formss'>
              <input
                type="number"
                placeholder="input amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
                required
                className='textbox'
              />
              <Btn text="Deposit" type="submit"/>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default DepositModal;
