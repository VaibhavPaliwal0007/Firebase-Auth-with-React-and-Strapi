module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1e74777bde5dcd2f4bea003d7590bc1b'),
  },
});
