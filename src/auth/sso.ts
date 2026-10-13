import passport from 'passport';
import { Strategy as SAMLStrategy } from 'passport-saml';

passport.use(new SAMLStrategy({
  entryPoint: process.env.SAML_ENTRY_POINT!,
  issuer: process.env.SAML_ISSUER!,
  callbackUrl: '/auth/saml/callback',
}, async (profile: any, done: any) => {
  return done(null, { id: profile.nameID, email: profile.email });
}));

export default passport;
