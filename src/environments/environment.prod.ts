export const environment = {
  production: true,
  urlbase: "http://prod.siberius.com.br/siberius-frontend/api",
  keycloak_installation: { url: 'http://prod.siberius.com.br/auth', realm: 'SIBERIUS', clientId: 'siberius-frontend' },
  keycloak_redirect_uri: "http://prod.siberius.com.br/siberius-frontend",
  keycloak_clientId_sboot: 'siberius-service',
  keycloak_clientId_angular: 'siberius-angular'
};
