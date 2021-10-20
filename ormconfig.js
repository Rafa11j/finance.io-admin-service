const path = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const { ormconfig } = require('./src/config/ormconfig');

module.exports = {
  ...ormconfig
};


