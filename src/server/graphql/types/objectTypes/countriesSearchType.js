import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

const CountryType  = require('./country_type').default
const AdminService = require('../../services/admin')

const CountrySearchType = new GraphQLObjectType({
  name: 'CountrySearchType',
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return AdminService.allCountries()
      }
    }
  }
})

export default CountrySearchType