import {
  graphql,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'CountriesSearchType',
  fields: {
      code: { type: GraphQLString },
      name: { type: GraphQLString }
  }
})