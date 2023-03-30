//만약 development 모드에 있을 때는 process.env.NODE_ENV가 dev에서 가져옴.
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
