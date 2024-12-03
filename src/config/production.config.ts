export const productionConfig = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h',
  },
};
