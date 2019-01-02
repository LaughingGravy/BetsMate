import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'VerifyType',
  fields: {
      verified: { type: GraphQLBoolean },
      message: { type: GraphQLString }
  }
})