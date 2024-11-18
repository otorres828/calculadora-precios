// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

var development = {
  postgres_USER:"************",
  postgres_HOST:"ep-red-art-34547297-pooler.us-east-1.aws.neon.tech",
  postgres_PASSWORD:"************",
  postgres_DATABASE:"************",
};

module.exports = development;
