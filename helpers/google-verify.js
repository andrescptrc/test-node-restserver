const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const googleVerify = async (token = "") => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const { name, picture, email } = ticket.getPayload();

  return {
    name,
    image: picture,
    email,
  };
};

module.exports = {
  googleVerify,
};
