import {
  graphql,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'CountryType',
  fields: {
      code: { type: GraphQLString },
      name: { type: GraphQLString }
  }
})