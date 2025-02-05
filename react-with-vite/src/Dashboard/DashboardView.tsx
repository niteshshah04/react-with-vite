import React from 'react';
import MuiTableWithFilter from './MuiTableWithFilter';
import SentimentBar from '../SentimentProgressBar/SentimentBar';


const DashboardView: React.FC = () => {
    return (
        <>
            <SentimentBar />
            <MuiTableWithFilter />
        </>
    )
}

export default DashboardView;