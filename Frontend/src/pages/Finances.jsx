// components
import Page from '@layout/Page';
import Balance from '@widgets/Balance';
import PaymentsFeed from '@widgets/PaymentsFeed';

const Finances = () => {
    return (
        <Page title="Finances">
            <div key="balance">
                <Balance/>
            </div>
            <div key="payments-feed">
                <PaymentsFeed/>
            </div>
        </Page>
    )
}

export default Finances;