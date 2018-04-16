import React from 'react';
import intl from 'react-intl-universal';

class HomePage extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <h1>{intl.get("home-page-title")}</h1>
          <p>The home should appear here..hhh.</p>
        </div>
      );
    }
  }
  
  export default HomePage;