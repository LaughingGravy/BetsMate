import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

import UserType  from './objectTypes/user_type'
import CountryType  from './objectTypes/country_type'
import StadiumType  from './objectTypes/stadium_type'

import CountryService from '../../services/country'
import StadiumService from '../../services/stadium'
import { checkRoleAndResolveAsync } from '../guards/guardResolvers'

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
            async resolve(parentValue, args, ctx) {
                return await checkRoleAndResolveAsync(ctx, CountryService.AllCountries, null, ["admin"]);
            }
        },
        countriesByName: {
            type: CountryType,
            args: {
                name: { type: GraphQLString },
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            async resolve(parentValue, { name, skip, limit }, ctx) {
                return await checkRoleAndResolveAsync(ctx, CountryService.GetCountryByName, 
                                                                { name, skip, limit }, ["admin"]);
            }
        },
        countryByCode: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            async resolve(parentValue, { code }, ctx) {
                return await checkRoleAndResolveAsync(ctx, CountryService.GetCountryByCode, code, ["admin"]);
            }
        },
        stadia: {
            type: new GraphQLList(StadiumType),
            async resolve(parentValue, args, ctx) {
                return await checkRoleAndResolveAsync(ctx, StadiumService.AllStadia, null, ["admin"]);
            }
        },
        stadiumById: {
            type: StadiumType,
            args: {
                stadiumId: { type: GraphQLString }
            },
            async resolve(parentValue, { stadiumId }, ctx) {
                return await checkRoleAndResolveAsync(ctx, StadiumService.GetStadiumById, stadiumId, ["admin"]);
            }
        },
    }
})