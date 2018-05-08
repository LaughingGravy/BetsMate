
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./types/root_query_type');
const mutation = require('./mutations');

export default new GraphQLSchema({
    query: RootQueryType,
    mutation
});