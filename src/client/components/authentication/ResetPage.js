import React from 'react'
import intl from 'react-intl-universal'

class ResetPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{intl.get("reset-page-title")}</h1>
        <p>The Password Reset page should appear here.</p>
      </div>
    );
  }
}
  
export default ResetPage