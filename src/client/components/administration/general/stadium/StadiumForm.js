import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { validateStadium } from './validate'
import { getErrObjs } from '../../../validation/common'
import ValidationInput from '../../../common/controls/baseValidatedControls/ValidationInput'
import CountriesDropdown from '../../../common/controls/CountriesDropdown'

class StadiumForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      stadiumName: props.name,
      city: props.city,
      country: props.country,
      pristineFields: {
        stadiumName: true,
        city: true,
        country: true
      }
    }
  }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }) }

  handleBlur = (name) => (e) => {
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false }
    })
  }

  onSelectChange = (e, data) => {
    const {value, options, name } = data
    let countryName = ""

    if (value != "")
      countryName = options.find(c => c.value === value).searchtext
  
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false },
      country: { name: countryName, code: value }
    })
  }

  onCloseClick = (e, data) => {
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false },
      country: { name: "", code: "" }
    })
  }

  render() {
    const { stadiumName, city, country, pristineFields } = this.state

    const errors = validateStadium(stadiumName, city, country)
    const stadiumNameErrObjs = getErrObjs(errors, "stadiumName")
    const cityErrObjs = getErrObjs(errors, "city")
    const countryErrObjs = getErrObjs(errors, "country")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {                      
                                                  e.preventDefault() 
                                              }}>
        <Form.Field required>
          <ValidationInput name='stadiumName' key="StadiumName" value={stadiumName} label={intl.get("stadium-name-label")} 
                  placeholder={intl.get("stadium-name-placeholder")} onChange={this.handleChange}
                  onBlur={this.handleBlur('stadiumName')}  
                  errors={stadiumNameErrObjs} pristine={pristineFields['stadiumName'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='city' key="StadiumCity" value={city} label={intl.get("stadium-city-label")} 
                  placeholder={intl.get("stadium-city-placeholder")} onChange={this.handleChange}
                  onBlur={this.handleBlur('city')}  
                  errors={cityErrObjs} pristine={pristineFields['city'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <CountriesDropdown name='country' key="StadiumCountries" value={country.code} label={intl.get("stadium-country-label")} 
                placeholder={intl.get("stadium-country-placeholder")} onChange={this.onSelectChange} 
                onBlur={this.handleBlur('country')} onCloseClick={this.onCloseClick}
                errors={countryErrObjs} pristine={pristineFields['country'] ? 1 : 0} />
        </Form.Field> 

        {this.props.render({ variables: { stadiumId: this.props.stadiumId, name: stadiumName, city, country}, isFormValid })}

      </Form>
    ) 
  } 
}

StadiumForm.propTypes = {
  stadiumId: PropTypes.string,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}).isRequired
};

export default StadiumForm