import React from 'react';
import intl from 'react-intl-universal';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{intl.get("login-page-title")}</h1>
        <p>The Login page should appear here.</p>
      </div>
    );
  }
}
  
  export default LoginPage;