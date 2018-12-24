import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { validateStadium } from './validate'
import { getErrObjs } from '../../../validation/common'
import ValidationInput from '../../../common/ValidationInput'

class StadiumForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      stadiumName: props.name,
      city: props.city,
      countryId: props.countryId,
      pristineFields: {
        stadiumName: true,
        city: true,
        countryId: true
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
    const { stadiumName, city, countryId, pristineFields } = this.state
    const errors = validateStadium(stadiumName, city, countryId)
    const stadiumNameErrObjs = getErrObjs(errors, "stadiumName")
    const cityErrObjs = getErrObjs(errors, "city")
    const countryIdErrObjs = getErrObjs(errors, "countryId")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {                      
                                                  e.preventDefault() 
                                              }}>
        <Form.Field required>
          <ValidationInput name='stadiumName' value={stadiumName} label={intl.get("stadium-stadiumName-label")} 
                  placeholder={intl.get("stadium-stadiumName-placeholder")} onChange={this.handleChange}
                  onBlur={this.handleBlur('stadiumName')}  
                  errors={stadiumNameErrObjs} pristine={pristineFields['stadiumName'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='city' value={code} label={intl.get("stadium-city-label")} 
                  placeholder={intl.get("stadium-city-placeholder")} onChange={this.handleChange}
                  onBlur={this.handleBlur('city')}  
                  errors={cityErrObjs} pristine={pristineFields['city'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='countryName' value={countryName} label={intl.get("country-name-label")} 
                  placeholder={intl.get("country-name-placeholder")} onChange={this.handleChange} 
                  onBlur={this.handleBlur('countryName')} 
                  errors={countryNameErrObjs} pristine={pristineFields['countryName'] ? 1 : 0} />
        </Form.Field>

        {this.props.render({ variables: { id: this.props.id, name: stadiumName, city: city, name: countryName }, isFormValid: isFormValid })}

      </Form>
    ) 
  } 
}

StadiumForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired
};

export default StadiumForm