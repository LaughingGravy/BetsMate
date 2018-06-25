import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

const UserType  = require('./user_type').default
const CountryType  = require('./country_type').default

const AdminService = require('../../services/admin')

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.user;
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parentValue, args) {
                return AdminService.allCountries()
            }
        }
    }
})