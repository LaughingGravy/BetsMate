const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

import Config from '../../../utilities/Config'

import UserType from './types/user_type'
import VerifyType from '../graphql/types/verify_type'
import SaveType from '../graphql/types/save_type'

import CountryType  from './types/country_type'
import StadiumType  from './types/stadium_type'

import AuthenticationService from '../services/authentication'
import CountryService from '../services/country'
import StadiumService from '../services/stadium'

import { checkRoleAndResolveAsync, checkAuthAndResolveAsync } from './guards/guardResolvers'

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                displayName: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString },
                timeZone: { type: GraphQLString }
            },
            async resolve(parentValue, { email, displayName, password, role, timeZone }, ctx ) { //request is request object from express
                const req = ctx.req;
                return await AuthenticationService.RegisterAsync({ email, displayName, password, role}, timeZone);
            }
        },
        verifyByEmail: {
            type: VerifyType,
            args: {
                email: { type: GraphQLString },
                emailVerificationString: { type: GraphQLString }
            },
            async resolve(parentValue, { email, emailVerificationString }, ctx ) { //request is request object from express
                const req = ctx.req;
                return await AuthenticationService.VerifyEmailAddressAsync({ email, emailVerificationString });
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parentValue, { email, password }, ctx) {
               const req = ctx.req;

               return await AuthenticationService.LoginAsync({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                const user = req.headers.authorization

                req.res.clearCookie(Config.jwt.cookieName);
                return user;
            }
        },
        sendPasswordReset: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                timeZone: { type: GraphQLString }
            },
            async resolve(parentValue, { email, timeZone }, ctx) {
                return await AuthenticationService.SendPasswordResetAsync({ email, timeZone });
            }
        },
        verifyPasswordResetToken: {
            type: VerifyType,
            args: {
                email: { type: GraphQLString },
                token: { type: GraphQLString }
            },
            async resolve(parentValue, { email, token }, ctx ) { //request is request object from express
                const req = ctx.req;
                return await AuthenticationService.VerifyPasswordResetTokenAsync({ email, token });
            }
        },
        resetChangePassword: {
            type: SaveType,
            args: {
                email: { type: GraphQLString },
                token: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parentValue, { email, token, password }, ctx) {
                return await AuthenticationService.ResetChangePasswordAsync({ email, token, password });
            }
        },
        changePassword: {
            type: SaveType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                newPassword: { type: GraphQLString }
            },
            async resolve(parentValue, { email, password, newPassword }, ctx) {
                return checkAuthAndResolveAsync(ctx, AuthenticationService.ChangePassword, { email, password, newPassword });
            }
        },
        createCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            async resolve(parentValue, { code, name }, ctx) {
                return checkRoleAndResolveAsync(ctx, CountryService.CreateCountry, { code, name }, ["admin"]);
            }
        },
        mergeCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            async resolve(parentValue, { code, name }, ctx) {
                return checkRoleAndResolveAsync(ctx, CountryService.MergeCountry, { code, name }, ["admin"]);
            }
        },
        deleteCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            async resolve(parentValue, { code }, ctx) {
                return checkRoleAndResolveAsync(ctx, CountryService.DeleteCountry, { code }, ["admin"]);
            }
        },
        createStadium: {
            type: StadiumType,
            args: {
                name: { type: GraphQLString },
                city: { type: GraphQLString },
                countryCode: { type: GraphQLString }
            },
            async resolve(parentValue, { name, city, countryCode }, ctx) {
                return checkRoleAndResolveAsync(ctx, StadiumService.CreateStadium, { name, city, countryCode }, ["admin"]);
            }
        },
    }
});
