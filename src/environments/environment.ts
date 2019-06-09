// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  urlbase: "http://localhost:8080/seven-service",
  keycloak_installation: { url: 'http://localhost:8081/auth', realm: 'Siberius', clientId: 'siberius-angular' },
  keycloak_redirect_uri: "/",
  keycloak_clientId_sboot: 'siberius-sboot',
  keycloak_clientId_angular: 'siberius-angular'
};
