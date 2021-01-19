import { gql } from "@apollo/client";

export const LOGIN = gql(`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            status,
            message,
            accessToken
        }
    }
`);

export const REGISTER = gql(`
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            status,
            message,
            accessToken
        }
    }
`);

export const PASSWORDRESET = gql(`
    mutation passwordReset($idToken: String!, $email: String!, $password: String!) {
        passwordReset(idToken: $idToken, email: $email, password: $password) {
            status,
            message,
            accessToken
        }
    }
`);
