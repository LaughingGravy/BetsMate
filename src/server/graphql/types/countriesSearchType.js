import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

//import CountryType from './country_type'
const CountryType  = require('./country_type').default
const AdminService = require('../../services/admin')

const CountrySearchType = new GraphQLObjectType({
  name: 'CountrySearchType',
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return AdminService.AllCountries()
      }
    }
  }
})

export default CountrySearchType