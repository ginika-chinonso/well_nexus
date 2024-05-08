// utils
import {lazy, Suspense} from 'react';

// components
import ScrollProgress from '@ui/ScrollProgress';
import Panel from '@layout/Panel';
import Sidebar from '@layout/Sidebar';
import {Navigate, Route, Routes} from 'react-router-dom';
import BottomMenu from '@layout/BottomMenu';
import WidgetsLoader from '@components/WidgetsLoader';

// hooks
import useWindowSize from '@hooks/useWindowSize';
import usePageIsOverflow from '@hooks/usePageIsOverflow';
import {useRef, useEffect} from 'react';

// pages

const DashboardK = lazy(() => import('@pages/DashboardK'));
const DoctorAppointments = lazy(() => import('@pages/DoctorAppointments'));
const PatientAppointments = lazy(() => import('@pages/PatientAppointments'));
const Patients = lazy(() => import('@pages/Patients'));
const Doctors = lazy(() => import('@pages/Doctors'));
const PatientMessenger = lazy(() => import('@pages/PatientMessenger'));
const Finances = lazy(() => import('@pages/Finances'));
const PageNotFound = lazy(() => import('@pages/PageNotFound'));

const AppLayout = () => {
    const appRef = useRef(null);
    const isOverflow = usePageIsOverflow();
    const {width} = useWindowSize();
    const isMobile = width < 768;

    useEffect(() => {
        if (appRef.current) {
            appRef.current.scrollTo(0, 0);
        }
    }, []);

    return (
        <div className="app" ref={appRef}>
            {isOverflow ? <ScrollProgress/> : null}
            <Sidebar/>
            <div className="app_content">
                <Panel/>
                <Suspense fallback={<WidgetsLoader />}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard_k"/>}/>
                        <Route path="/dashboard_k" element={<DashboardK/>}/>
                        <Route path="/doctor_appointments" element={<DoctorAppointments/>}/>
                        <Route path="/patient_appointments" element={<PatientAppointments/>}/>
                        <Route path="/patients" element={<Patients/>}/>
                        <Route path="/doctors" element={<Doctors/>}/>
                        <Route path="/patient_messenger" element={<PatientMessenger/>}/>
                        <Route path="/finances" element={<Finances/>}/>
                        <Route path="/404" element={<PageNotFound/>}/>
                        <Route path="*" element={<Navigate to="/404" replace/>}/>
                    </Routes>
                </Suspense>
            </div>
            {isMobile ? <BottomMenu/> : null}
        </div>
    )
}

export default AppLayout;