
import React from 'react';
import intl from 'react-intl-universal'
import { Form, Container } from 'semantic-ui-react'

const CountryFormBak = ({ onSubmit, handleChange, code, countryName, loading}) => {
  return (
    <Form className='segment' onSubmit={onSubmit}>
      <Form.Field required>
        <Form.Input name='code' value={code} label={intl.get("country-code-label")} 
                placeholder={intl.get("country-code-placeholder")} onChange={handleChange} />
      </Form.Field>

      <Form.Field required>
        <Form.Input name='countryName' value={countryName} label={intl.get("country-name-label")} 
                placeholder={intl.get("country-name-placeholder")} onChange={handleChange} />
      </Form.Field>

      <Container textAlign='center'>
        <Form.Button primary loading={loading}>{intl.get("save-button-label")}</Form.Button>
      </Container>
    </Form>
  )
}

export default CountryFormBak