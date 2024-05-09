// components
import Page from '@layout/Page';
import Balance from '@widgets/Balance';
import PaymentsFeed from '@widgets/PaymentsFeed';
import DepositModal from '@components/Depositmodal';
import { useState } from 'react';

const Finances = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
        console.log('opened')
      }; 
    return (
        <Page title="Finances">
            <div key="balance">
                <Balance start={toggleModal}/>
            </div>
            <div key="payments-feed">
                <PaymentsFeed/>
            <DepositModal open={isOpen} close={toggleModal}/>
            </div>
        </Page>
    )
}

export default Finances;