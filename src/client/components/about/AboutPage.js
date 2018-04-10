import React from 'react';
import intl from 'react-intl-universal';

class AboutPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h1>{intl.get("about-page-title")}</h1>
          <p>The about should appear here.</p>
        </div>
      );
    }
  }
  
  export default AboutPage;