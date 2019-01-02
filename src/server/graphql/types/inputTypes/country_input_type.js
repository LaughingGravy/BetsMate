
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

export default new GraphQLInputObjectType({
  name: 'CountryInputType',
  fields: {
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})