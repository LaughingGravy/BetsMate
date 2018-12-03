import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'SaveType',
  fields: {
      saved: { type: GraphQLBoolean },
      message: { type: GraphQLString }
  }
})