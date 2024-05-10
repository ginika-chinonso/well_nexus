// components
import Page from '@layout/Page';
import Statistics from '@widgets/Statistics';
import PaymentsHistory from '@widgets/PaymentsHistory';
import RecentQuestions from '@widgets/RecentQuestions';
import CreateModal from '@components/CreateModal';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const DashboardK = () => {
    return (
        <Page title="Dashboard">
            <div key="stat-cause">
                <Statistics data={{type: 'cause', value: '970', text: 'Approximately 1 in every 8 people worldwide, or 970 million people, live with a mental disorder.'}}/>
            </div>
            <div key="stat-teeth">
                <Statistics data={{type: 'teeth', value: '301', text: 'As of 2019, 301 million people were living with an anxiety disorder.'}}/>
            </div>
            <div key="stat-heart">
                <Statistics data={{type: 'heart', value: '100', text: 'Depressive disorders are another prevalent form of mental illness, affecting millions of people globally'}}/>
            </div>
            <div key="payments-history">
                <PaymentsHistory variant="compact"/>
            </div>
            <div key="recent-tests">
                <RecentQuestions />
            </div>
        </Page>
    )
}

export default DashboardK;