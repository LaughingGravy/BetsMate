import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'StadiumType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    city: { type: GraphQLString },
    countryCode: { type: GraphQLString }
  }
})