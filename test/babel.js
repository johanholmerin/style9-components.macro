const babel = require('@babel/core');
const path = require('path');
const plugin = require('style9/babel');

const output = babel.transformFileSync(path.resolve(__dirname, './input.js'), {
  plugins: [
    'macros',
    // plugin
  ],
});
console.log(output.code)
console.log(output.metadata.style9)
