const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

//const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: require('./types/user_type').default,
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
            type: require('./types/user_type').default,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: require('./types/user_type').default,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
                const req = ctx.req;
                return AuthService.login({ email, password, req });
            }
        }
    }
});

//export default mutation;