export default {
  PROXY_URL: process.env.REACT_APP_PROXY_URL || 'http://127.0.0.1:5000',
  GRAPHQL_URL: `${process.env.REACT_APP_PROXY_URL}/graphql`
}
