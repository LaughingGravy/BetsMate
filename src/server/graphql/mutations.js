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
const AdminService = require('../services/admin')

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
                console.log("user req", user, req)
                req.logout();
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
                return AuthService.SendPasswordReset({ email, timeZone });
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
                return AuthenticationService.CheckPasswordResetToken({ email, token });
            }
        },
        changePassword: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
                const req = ctx.req
                const { token } = req.body
                return AuthService.ChangePassword({ email, password, token });
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
