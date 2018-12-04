import App, { Container } from 'next/app'
import Head from 'next/head'

import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import getPageContext from '../lib/page-context'
import MainLayout from '../components/main-layout'

import { getStore } from '../lib/store'
import initApollo from '../lib/init-apollo'


const client = initApollo()

class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    const store = getStore(this.props.router)
    return (
      <Container>
        <Head>
          <title>Cicuro Admin</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <ApolloProvider store={store} client={client}>
              <Provider store={store}>
                <MainLayout>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </MainLayout>
              </Provider>
            </ApolloProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default MyApp

