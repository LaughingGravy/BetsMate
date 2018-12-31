import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

import CountryType from './country_type';

export default new GraphQLObjectType({
  name: 'StadiumType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    city: { type: GraphQLString },
    country: {type: CountryType}
  }
})