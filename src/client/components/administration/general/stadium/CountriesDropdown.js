import React from 'react'
import { Query } from 'react-apollo'
import { compose } from 'recompose'

import { renderForLoading, renderForError, LoadingDisplay, QueryErrorDisplay } from '../../../common/ConditionalRender'

import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'

import ValidationDropdown from '../../../common/controls/ValidationDropdown'

const vanillaValidationDropdown  = ({errors, pristine, placeholder, data: { countries }}, value ) => {
  const displayProperty = "name"
  const valueProperty = "code"
  return (
    <ValidationDropdown displayProperty={displayProperty} valueProperty={valueProperty} options={countries} 
                        errors={errors} pristine={pristine} placeholder={placeholder} value={value} />
  )
}

const EnhancedValidationDropdown = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(vanillaValidationDropdown)

const CountriesDropdown = (props) => {
  return (
    <Query query={ALL_COUNTRIES}>
    {({ loading, error, data }) => { 
      return (
        <EnhancedValidationDropdown {...props} data={data} loading={loading} error={error} />
      )
    }}
    </Query>
  )
}

export default CountriesDropdown