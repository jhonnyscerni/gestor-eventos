export const environment = {
  production: true,
  urlbase: "http://prod.tre-pa.jus.br/seven-frontend/api",
  keycloak_installation: { url: 'http://prod.tre-pa.jus.br/auth', realm: 'TRE-PA', clientId: 'seven-frontend' },
  keycloak_redirect_uri: "http://prod.tre-pa.jus.br/seven-frontend",
  keycloak_clientId_sboot: 'seven-frontend-service',
  keycloak_clientId_angular: 'seven-angular'
};
