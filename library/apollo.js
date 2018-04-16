import ApolloClient from "apollo-boost";

export function browserClient(opt)
{
    return new ApolloClient(opt);
};