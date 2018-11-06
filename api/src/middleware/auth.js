import jwt from 'express-jwt';

export default jwt({
  secret: 'somesuperdupersecret',
  credentialsRequired: false,
});
