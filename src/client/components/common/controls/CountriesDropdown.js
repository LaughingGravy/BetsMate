import React from 'react'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { getFlag } from '../../../../../static/flags/flagHelper'

import { renderForLoading, renderForError, LoadingDisplay, QueryErrorDisplay } from '../ConditionalRender'

import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'

import ValidationDropdown from '../../common/controls/baseValidatedControls/ValidationDropdown'

const itemContainerStyle = {
  display: "flex",
  position: 'relative',
  alignItems: 'center'
}

const flagTextStyle = {
  marginLeft: "0.5em"
}

const vanillaValidationDropdown  = (props) => {
  return (
    <ValidationDropdown {...props} />
  )
}

const EnhancedValidationDropdown = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(vanillaValidationDropdown)

const CountriesDropdown = (props) => {

  const flagRenderer = (code) => {
    const filename = code.replace(" ", "-")
    return (getFlag(filename, 24, 18))
  }

  const getOptions = (data) => {
    if (!data || !data.countries) return [];

    const { countries } = data

    const options = countries.map(item => ({key: `${item.code}`, value: `${item.code}`, searchtext: `${item.name}`, 
                                      text: <div style={itemContainerStyle}>{flagRenderer(item.code)}<span style={flagTextStyle}>{item.name}</span></div>}))
    
    return options;
  }

  const searchQuery = (options, query) => {
    const re = new RegExp(query.toLowerCase())
    return options.filter(opt => re.test(opt.searchtext.toLowerCase()))
  }

  return (
    <Query query={ALL_COUNTRIES}>
    {({ loading, error, data }) => { 

      const options = getOptions(data)

      return (
        <EnhancedValidationDropdown {...props} options={options} search={searchQuery} loading={loading} error={error} />
      )
    }}
    </Query>
  )
}

export default CountriesDropdown