import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Label, Icon, Container } from 'semantic-ui-react'

import { containerStyle, closeIconStyle, errorIconStyle } from './ValidationDropdownCss'
import ValidationErrorPopup from '../ValidationErrorPopup'

const ValidationDropdown = (props) => {
  const { errors, pristine, placeholder, label, onChange, onBlur, onCloseClick, name, key, options, value, defaultValue, search={search} } = props  
  let objs = []

  if (errors)
    objs = errors.objs

  let isError = false
  // let errMessages = ""
  let firstErrMessage = ""

  if (objs && objs.length > 0) {
    isError = true
    firstErrMessage = objs[0].msg
  }

  const shouldDisplayError = !pristine && isError 

  return (
    <React.Fragment>
      {!shouldDisplayError && 
          <div style={containerStyle}>
                  <Icon link style={closeIconStyle} name="close" onClick={onCloseClick} />
                  <Form.Dropdown name={name} key={key} fluid selection label={label} 
                                  placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                                  search={search} options={options} 
                                  value={value} defaultValue={defaultValue}/>
          </div>}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <Container style={containerStyle} fluid> 
          <ValidationErrorPopup message={firstErrMessage} style={errorIconStyle} />
          <Form.Dropdown name={name} key={key} fluid selection label={label} error
                          placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                          search={search} options={options} 
                          value={value} defaultValue={defaultValue}>
          </Form.Dropdown>
        </Container>
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>       
        <Form.Dropdown name={name} key={key} fluid selection label={label} 
                        value={value} defaultValue={defaultValue} placeholder={placeholder} 
                        onChange={onChange} onBlur={onBlur} search={search} options={options} />
        <Label size="mini" basic color="red" basic pointing>{firstErrMessage}</Label>
      </Responsive>}
    </React.Fragment>
  )
}

ValidationDropdown.propTypes = {
  errors: PropTypes.shape({
    objs: PropTypes.arrayOf(PropTypes.shape({
      test: PropTypes.func.isRequired,
      msg: PropTypes.string.isRequired
    }))
  }),
  pristine: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default ValidationDropdown
