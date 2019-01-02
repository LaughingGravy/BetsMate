import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'CountryType',
  fields: {
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})