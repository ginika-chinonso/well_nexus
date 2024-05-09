// styled components
import {Wrapper, Block, BalanceInfo} from './style';

// components
import Widget from '@components/Widget';
import WidgetHeader from '@components/Widget/WidgetHeader';
import WidgetBody from '@components/Widget/WidgetBody';
import styled from 'styled-components';
import {colors, textSizes, fonts, flex} from '@styles/vars';
import {darken} from 'polished';
import {motion, AnimatePresence} from 'framer-motion';
import { useReadContract, useAccount } from 'wagmi'
import {abi} from '@constants/wellnexusabi';
import { WellNexusAddress } from '@constants/address';
import { useState, useEffect } from 'react';




const Button = styled.button`
  border-radius: 8px;
  background-color: ${colors.blue};
  color: #fff;
  font-size: ${textSizes['14']};
  font-family: ${fonts.accent};
  height: 40px;
  width: 100%;
  display: flex;
  ${flex.center};
  gap: 8px;
  line-height: 1;
  transition: background-color var(--transition);
  

  &:hover, &:focus {
    background-color: ${darken(0.1, colors.blue)};
  }

  &.success {
    background-color: ${colors.success};

    &:hover, &:focus {
      background-color: ${darken(0.1, colors.success)};
    }
  }

  &.error {
    background-color: ${colors.error};

    &:hover, &:focus {
      background-color: ${darken(0.1, colors.error)};
    }
  }

  &.disabled {
    background-color: ${colors.gray};
    pointer-events: none;
  }
`

const Balance = (props) => {
    const [balance, setBalance] = useState(0)
    const {address} = useAccount()


    const result = useReadContract({
        abi,
        address: WellNexusAddress,
        functionName: 'get_user_balance',
        args : [address]
      })
    
      useEffect(() => {
        setBalance(Number(result.data));
      }, [result])
      
     
    return (
        <>
    <Widget name="Balance">
            <WidgetHeader title="Account Balance" style={{paddingBottom: 10}} />
            <WidgetBody>
                <Wrapper>
                    <Block>
                        <span className="label">Active balance</span>
                        <BalanceInfo className="h1" color="azure">$ {balance}</BalanceInfo>
                    </Block>
                    <span className="divider"></span>
                    <Block>
                        <span className="label">Bonus balance</span>
                        <BalanceInfo className="h1" color="orange">$ 0</BalanceInfo>
                    </Block>
                </Wrapper>
                <Button as={motion.button}
                            initial={false}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: .3}} onClick={props.start}>
                        Refill balance
                    </Button>
            </WidgetBody>
        </Widget>
            
        </>
        
    )
}

export default Balance;