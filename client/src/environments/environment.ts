// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// This build is intended for deployment to the local environment

export const environment = {
  production: false,
  apiBase: 'http://localhost:8003',
  local: false,
  loginRedirect: '/search',
};
