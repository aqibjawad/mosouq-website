import React from 'react';

import BusinessHeader from './businessHeader';
import BusinessImages from './businessImages';
import BusinessDetails from './businessDetails';
import HomeReviews from '../home/home.reviews';

import "./index.css"

const BusinessListing =()=>{
    return(
        <div id="businessList">
            <BusinessHeader />
            <BusinessImages />
            <BusinessDetails />
            <div className='mt-5 mb-5'>
                <HomeReviews />
            </div>
        </div>
    )
}

export default BusinessListing;