const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

const CountryType = require('./types/country_type').default
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
                role: { type: GraphQLString }
            },
            resolve(parentValue, { email, displayName, password, role }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthenticationService.RegisterUser({ email, displayName, password, role, timeZone, req });
            }
        },
        verifyByEmail: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                emailVerificationString: { type: GraphQLString }
            },
            resolve(parentValue, { email, emailVerificationString }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthenticationService.VerifyEmailAddress({ email, emailVerificationString, req });
            }
        },
        loginUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
                const req = ctx.req;
                return AuthenticationService.LoginUser({ email, password, req });
            }
        },








        logout: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                const { user } = req;
                req.logout();
                return user;
            }
        },
        
        resetLink: {
            type: UserResetType,
            args: {
                email: { type: GraphQLString },
                timeZone: { type: GraphQLString }
            },
            resolve(parentValue, { email, timeZone }, ctx) {
                return AuthService.resetLink({ email, timeZone });
            }
        },
        registerLink: {
            type: UserRegisterType,
            args: {
                email: { type: GraphQLString },
                timeZone: { type: GraphQLString }
            },
            resolve(parentValue, { email, timeZone }, ctx) {
                return AuthService.registerLink({ email, timeZone });
            }
        },
        resetPassword: {
            type: UserResetType,
            args: {
                token: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { token, password }, ctx) {
                return AuthService.resetPassword({ token, password });
            }
        },
        changePassword: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                newPassword: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, newPassword}, ctx) {
                const req = ctx.req;
                return AuthService.changePassword({ email, password, req}, newPassword);
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
