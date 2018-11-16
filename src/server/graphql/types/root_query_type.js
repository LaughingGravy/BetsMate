import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

const UserType  = require('./user_type').default
const CountryType  = require('./country_type').default

const AdminService = require('../../services/admin')
import jwt from 'jsonwebtoken'
import Config from '../../../../utilities/Config'

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user: {
        //     type: UserType,
        //     resolve(parentValue, args, ctx) {
        //         const req = ctx.req;
        //         return req.user;
        //     }
        // },
        // countries: {
        //     type: new GraphQLList(CountryType),
        //     resolve(parentValue, args) {
        //         return AdminService.allCountries()
        //     }
        // },
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;

                let user = {};
                
                user.email = "ronald@interlogic.co.nz"
                user.displayName = "Baikinman"
                user.role = "admin"
                user.lastAccessDate = null
                user.registerDate = null

                return user;
            }
        },
        //         //const cookie = req.signedCookies["betsmate"];

        //         // if (cookie) {
        //         //     jwt.verify(cookie, Config.secret, (err, data) => {
        //         //         if (!err && data) {
        //         //             let user = new {
        //         //                             email: data.email,
        //         //                             displayName: data.displayName,
        //         //                             role: data.role,
        //         //                             registerDate: null,
        //         //                             lastAccessDate: null 
        //         //                         };

        //         //             return user;
        //         //         }
        //         //     });
        //         // };
        //     }
        // },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parentValue, args, ctx) {
                return checkAuthAndResolve(ctx, AdminService.allCountries());
            }
        },
        countryByCode: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parentValue, { code }) {
                return AdminService.getCountryByCode(code)
            }
        }
    }
})