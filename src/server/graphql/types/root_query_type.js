import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

const UserType  = require('./user_type').default
const CountryType  = require('./country_type').default

const AdminService = require('../../services/admin')
import { checkRoleAndResolve } from '../resolvers/checkRoleAndResolve'

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.headers.authorization;
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parentValue, args, ctx) {
                console.log("RootQueryType")
                return checkRoleAndResolve(ctx, AdminService.allCountries, null, ["admin"]);
            }
        },
        countryByCode: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parentValue, { code }, ctx) {
                return checkRoleAndResolve(ctx, AdminService.getCountryByCode, code, ["admin"]);
            }
        }
    }
})