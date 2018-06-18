import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import CountryType from './country_type'
const AdminService = require('../../services/admin')

const CountrySearchType = new GraphQLObjectType({
  name: 'CountrySearchType',
  fields: {
    Countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return AdminService.AllCountries()
      }
    }
  }
})