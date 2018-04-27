import {
    graphql,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

const RoleType = new GraphQLObjectType({
    name: 'RoleType',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    }
})

export default RoleType;