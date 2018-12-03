const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

import UserType from './types/user_type'
const CountryType = require('./types/country_type').default
import VerifyType from '../graphql/types/verify_type'
import SaveType from '../graphql/types/save_type'
const AdminService = require('../services/admin')

import Config from '../../../utilities/Config'

import AuthenticationService from '../services/authentication'

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
            resolve(parentValue, { email, displayName, password, role, timeZone }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthenticationService.Register({ email, displayName, password, role}, timeZone);
            }
        },
        verifyByEmail: {
            type: VerifyType,
            args: {
                email: { type: GraphQLString },
                emailVerificationString: { type: GraphQLString }
            },
            resolve(parentValue, { email, emailVerificationString }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthenticationService.VerifyEmailAddress({ email, emailVerificationString });
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
               const req = ctx.req;

               return AuthenticationService.Login({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                const { user } = req;

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
            resolve(parentValue, { email, timeZone }, ctx) {
                return AuthenticationService.SendPasswordReset({ email, timeZone });
            }
        },
        verifyPasswordResetToken: {
            type: VerifyType,
            args: {
                email: { type: GraphQLString },
                token: { type: GraphQLString }
            },
            resolve(parentValue, { email, token }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthenticationService.VerifyPasswordResetToken({ email, token });
            }
        },
        resetChangePassword: {
            type: SaveType,
            args: {
                email: { type: GraphQLString },
                token: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, token, password }, ctx) {
                return AuthenticationService.ResetChangePassword({ email, token, password });
            }
        },
        changePassword: {
            type: SaveType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                newPassword: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, newPassword }, ctx) {
                return AuthenticationService.ChangePassword({ email, password, newPassword });
            }
        },


        



        mergeCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve(parentValue, { code, name }) {
                return AdminService.mergeCountry({ code, name });
            }
        },
        deleteCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parentValue, { code }) {
                return AdminService.deleteCountry({ code });
            }
        }
    }
});
