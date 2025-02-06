import React from 'react';
import DashboardTable from './DashboardTable';
import SentimentBar from '../SentimentProgressBar/SentimentBar';


const DashboardView: React.FC = () => {
    return (
        <>
            <SentimentBar />
            <DashboardTable />
        </>
    )
}

export default DashboardView;