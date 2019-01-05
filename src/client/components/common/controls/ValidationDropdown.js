import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Label } from 'semantic-ui-react'
import { compose } from 'recompose'

import { renderAltIfNoPropValue } from '../../common/ConditionalRender'
import ValidationErrorPopup from './ValidationErrorPopup'

const DropdownWithValue = ({placeholder, options, defaultValue, search }) => {
  <Form.Dropdown placeholder={placeholder} search={search} fluid selection options={options} value={defaultValue} />
}

const DropdownWithoutValue = ({placeholder, options, search }) => {
  return (
    <Form.Dropdown placeholder={placeholder} search={search} fluid selection options={options} />
  )
}

const EnhancedDropdown = compose(
  renderAltIfNoPropValue(DropdownWithValue, DropdownWithoutValue, "defaultValue")
)(DropdownWithValue)

const ValidationDropdown = (props) => {
  const { errors, pristine, placeholder, onChange, displayProperty, valueProperty, options, defaultValue, search={search} } = props
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
      {!shouldDisplayError && <EnhancedDropdown placeholder={placeholder} search={search} fluid selection options={options} defaultValue={defaultValue} />}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <Form.Dropdown error {...props} icon>
          <input />
          <ValidationErrorPopup message={firstErrMessage} />
        </Form.Dropdown>  
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>         
      <React.Fragment>
        <Form.Dropdown error {...props} />
        <Label size="mini" basic color="red" basic pointing>{firstErrMessage}</Label>
        </React.Fragment>
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
  displayProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default ValidationDropdown
