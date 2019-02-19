import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Responsive, Form, Label, Container } from 'semantic-ui-react'

import { hideIfNoProp } from '../../../common/ConditionalRender'
import { containerStyle, closeIconStyle, dropdownErrorIconStyle } from './ValidationCss'
import ValidationErrorPopup from '../ValidationErrorPopup'
import { ICONS, SVG } from '../../../../../../static/svgHelper'

const vanillaClearIcon = ({isVisible, onClick}) => <SVG width="24" height="24" path={ICONS.CLOSE.path} viewBox={ICONS.CLOSE.viewBox} style={closeIconStyle} onClick={onClick} title="Clear" />

const EnhancedClearIcon = compose(
  hideIfNoProp("isVisible")
)(vanillaClearIcon)

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
                  <EnhancedClearIcon onClick={onCloseClick} isVisible={value} />
                  <Form.Dropdown name={name} key={key} fluid selection label={label} 
                                  placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                                  search={search} options={options}
                                  value={value} defaultValue={defaultValue}/>
          </div>}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <Container style={containerStyle} fluid> 
          <ValidationErrorPopup message={firstErrMessage} style={dropdownErrorIconStyle} />
          <Form.Dropdown name={name} key={key} fluid selection label={label} error
                          placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                          search={search} options={options} 
                          value={value} defaultValue={defaultValue}>
          </Form.Dropdown>
        </Container>
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>       
        <Form.Dropdown name={name} key={key} fluid selection label={label} error
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
