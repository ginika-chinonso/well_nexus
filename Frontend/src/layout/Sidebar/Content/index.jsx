// styled components
import { List, MainItem} from '../style';
// import {colors} from '@styles/vars';

// components
import Accordion from 'react-bootstrap/Accordion';
import {NavLink} from 'react-router-dom';

// hooks
// import {useSidebarContext} from '@contexts/sidebarContext';


const Content = () => {
    // const {toggleSidebar} = useSidebarContext();
    // const activeStyle = {color: colors.blue};
    const whosestat = true;

    return (
        <List as={Accordion}>
            <NavLink to='/dashboard_k'>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-blocks`}></i> dashboard
                                </MainItem>
            </NavLink>
                        <NavLink to={whosestat ? '/patient_appointments' : '/doctor_appointments'}>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-calendar`}></i> Appointments
                                </MainItem>
            </NavLink>
            {!whosestat ? (
                <NavLink to='/patients'>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-users`}></i> patients
                                </MainItem>
                </NavLink>
            ) : null}
            
            <NavLink to='/doctors'>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-stethoscope`}></i> therapists
                                </MainItem>
            </NavLink>
            
            <NavLink to='/patient_messenger'>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-comment`}></i> messages
                                </MainItem>
            </NavLink>

            <NavLink to='/finances'>
                                <MainItem as={Accordion.Header}>
                                    <i className={`icon icon-wallet`}></i> finances
                                </MainItem>
            </NavLink>

        </List>
    )
}

export default Content;