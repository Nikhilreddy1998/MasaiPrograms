const boxen = require('boxen');

console.log(boxen('I am using my first external module', {title:'Hurray!!!!',padding: 1,titleAlignment: 'center'}));
console.log(boxen('I am using my first external module', {title:'Hurray!!!!',padding: 1, margin: 1, borderStyle: 'double',titleAlignment: 'center'}));
console.log(boxen('I am using my first external module', {title: 'Hurray!!!!', titleAlignment: 'center'}));
