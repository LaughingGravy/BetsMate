import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import GraphQLDate from 'graphql-date'

export default new GraphQLObjectType({
  name: 'UserRegisterType',
  fields: {
      email: { type: GraphQLString },
      token: { type: GraphQLString },
      expiry: { type: GraphQLDate }
  }
})