import React from 'react';
import intl from 'react-intl-universal';

class AdministrationPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h1>{intl.get("admin-page-title")}</h1>
          <p>The administration should appear here.</p>
        </div>
      );
    }
  }

  export default AdministrationPage;