const path = require(`path`);

module.exports = {
  entry: [
    `./js/src/ajax.js`,
    `./js/src/data.js`,
    `./js/src/map.js`,
    `./js/src/card.js`,
    `./js/src/pin.js`,
    `./js/src/form.js`,
    `./js/src/main-pin.js`,
    `./js/src/util.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `js`),
    iife: true
  },
  devtool: false
};
