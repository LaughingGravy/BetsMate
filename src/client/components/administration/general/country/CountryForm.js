
import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { validateCountry } from './validate'
import { getErrObjs } from '../../../validation/common'
import ValidationInput from '../../../common/ValidationInput'

class CountryForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.code,
      countryName: props.countryName,
      pristineFields: {
        code: true,
        countryName: true
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleBlur = (name) => (e) => {
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false }
    })
  }

  render() {
    const { code, countryName, pristineFields } = this.state
    const errors = validateCountry(code, countryName)
    const codeErrObjs = getErrObjs(errors, "code")
    const countryNameErrObjs = getErrObjs(errors, "countryName")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {                      
                                                  e.preventDefault() 
                                              }}>
        <Form.Field required>
          <ValidationInput name='code' value={code} label={intl.get("country-code-label")} 
                  placeholder={intl.get("country-code-placeholder")} onChange={this.handleChange}
                  onBlur={this.handleBlur('code')}  
                  errors={codeErrObjs} pristine={pristineFields['code'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='countryName' value={countryName} label={intl.get("country-name-label")} 
                  placeholder={intl.get("country-name-placeholder")} onChange={this.handleChange} 
                  onBlur={this.handleBlur('countryName')} 
                  errors={countryNameErrObjs} pristine={pristineFields['countryName'] ? 1 : 0} />
        </Form.Field>

        {this.props.render({ variables: { code: code, name: countryName }, isFormValid: isFormValid })}

      </Form>
    ) 
  } 
}

CountryForm.propTypes = {
  id: PropTypes.string,
  code: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired
};

export default CountryForm