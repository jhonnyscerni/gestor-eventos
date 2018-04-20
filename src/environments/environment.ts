// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  urlbase: "http://localhost:8080/seven-service",
  //urlbase: "http://dev.tre-pa.jus.br/seven-frontend/api",
  keycloak_installation: { url: 'http://localhost:8081/auth', realm: 'TRE-PA', clientId: 'seven-angular' },
  keycloak_redirect_uri: "/",
  keycloak_clientId_sboot: 'seven-backend',
  keycloak_clientId_angular: 'seven-angular'
};
