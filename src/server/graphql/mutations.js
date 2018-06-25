const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

const UserType = require('./types/user_type').default;
const AuthService = require('../services/auth');

const CountryType = require('./types/country_type').default
const AdminService = require('../services/admin')

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, role }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthService.signup({ email, password, role, req});
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
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
                const req = ctx.req;
                return AuthService.login({ email, password, req });
            }
        },
        createCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve(parentValue, { code, name }) {
                return AdminService.createCountry({ code, name });
            }
        }
    }
});
