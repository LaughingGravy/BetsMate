import React from 'react';
import intl from 'react-intl-universal';

const HomePage = () => {
  return (
    <React.Fragment>
      <h1>{intl.get("home-page-title")}</h1>
      <p>The home should appear here..hhh.</p>
    </React.Fragment> 
  );    
};

export default HomePage;
  