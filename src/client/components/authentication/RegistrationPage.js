import React from 'react';
import intl from 'react-intl-universal';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>{intl.get("register-page-title")}</h1>
        <p>The Registration page should appear here.</p>
      </div>
    );
  }
}
  
  export default RegistrationPage;