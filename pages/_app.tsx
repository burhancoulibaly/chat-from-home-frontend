// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import TopNav from '../components/topNav'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AuthProvider } from '../hooks/useAuth';
import { useValidation, ValidationProvider } from '../hooks/useValidationTest';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/79b0fa06bc.js" crossOrigin="anonymous"></script>
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider authProvider={null}>
          <ValidationProvider>
            <TopNav/>
            <Component {...pageProps} />
          </ValidationProvider>
        </AuthProvider>  
      </ApolloProvider>
    </>
  );
}




// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp

