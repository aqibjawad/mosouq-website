import React from "react";

import HomeBanner from "./home.banner";
import HomeCategory from "./home.category";
import HomeReview from "./home.reviews";

import HomePartners from "./home.partners";
// import HomeTrending from "./home.trending";

import HomeDeals from "./home.deals";

import HomeBusiness from "./home.business";

// import ExploreDubai from "./home.dubai";

const Home = () => {
  return (
    <div>
      <HomeBanner />

      <HomeCategory />

      <HomeBusiness />

      <HomePartners />

      {/* <HomeTrending /> */}

      <HomeDeals />

      <HomeReview />

      {/* <ExploreDubai /> */}
    </div>
  );
};

export default Home;
