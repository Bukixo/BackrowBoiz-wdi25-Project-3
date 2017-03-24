const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project-3-${env}`;
const secret = process.env.SECRET || 'Ever since you left the city, You gotta reputation for yourself now!';

module.exports = { port, env, dbURI, secret };
