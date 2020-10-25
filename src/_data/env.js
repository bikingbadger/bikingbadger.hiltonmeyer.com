const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = "prod";
const isProd = environment === PROD_ENV;

console.log(environment);

module.exports = {
  environment,
  isProd,
};
