import React from 'react';
import { compose } from 'recompose'
import { Form } from 'semantic-ui-react'

import { withValidationPopUp } from './withValidationPopup';
import { renderOrIfPropArray } from '../common/ConditionalRender'

const formInput = <Form.Input />

const InputWithValidation = withValidationPopUp(formInput)

const ValidationInput = compose(
  renderOrIfPropArray(InputWithValidation, "errors")
)(formInput)

export default ValidationInput