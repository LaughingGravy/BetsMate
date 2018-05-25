
//import { graphql, GraphQLSchema } from 'graphql'
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

import RootQueryType from './types/root_query_type'
import mutation from'./mutations'

export default new GraphQLSchema({
    query: RootQueryType,
    mutation
})