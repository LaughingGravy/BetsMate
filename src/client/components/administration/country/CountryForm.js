
import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import SaveCountryButton from './SaveCountryButton'

class CountryForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.code,
      countryName: props.countryName
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { code, countryName } = this.state

    return (
      <Form className='segment' onSubmit={e => {                      
                                                  e.preventDefault() 
                                              }}>
        <Form.Field required>
          <Form.Input name='code' value={code} label={intl.get("country-code-label")} 
                  placeholder={intl.get("country-code-placeholder")} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='countryName' value={countryName} label={intl.get("country-name-label")} 
                  placeholder={intl.get("country-name-placeholder")} onChange={this.handleChange} />
        </Form.Field>

        <SaveCountryButton code={code} name={countryName} />

      </Form>
    ) 
  } 
}

CountryForm.propTypes = {
  code: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired
};

export default CountryForm