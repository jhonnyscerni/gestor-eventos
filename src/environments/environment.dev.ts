// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  urlbase: "http://siberius.com.br/siberius-frontend/api",
  keycloak_installation: { url: 'http://siberius.com.br/auth', realm: 'TRE-PA', clientId: 'siberius-frontend' },
  keycloak_redirect_uri: "http://siberius.com.br/siberius-frontend",
  keycloak_clientId_sboot: 'siberius-frontend-service'
};
