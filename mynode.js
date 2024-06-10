const fs = require('fs');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const envFilePath = `src/.env.${env}`;

dotenv.config({ path: envFilePath });

const envConfig = `
export const environment = {
  backendUrl: '${process.env.backendUrl}',
  keycloakUrl: '${process.env.keycloakUrl}',
  realm: '${process.env.realm}',
  clientId: '${process.env.clientId}',
  keycloakRedirectUri: '${process.env.keycloakRedirectUri}',
};
`;

if (env === 'development'){
  fs.writeFileSync('./src/environments/environment.development.ts', envConfig);
} else {
  fs.writeFileSync('./src/environments/environment.ts', envConfig);
}
