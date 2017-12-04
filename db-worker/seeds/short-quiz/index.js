/*const Papa = require('babyparse');
const fs = require('fs');
const path = require('path');
const modelObj = require('../../db');
const flatten = require('lodash.flatten');

let quiz = path.resolve(__dirname).split('/').pop();
const db = modelObj[quiz];
const data = Papa.parseFiles(
  [
    `./seeds/${quiz}/stimuli.csv`
  ],
  { header: true }
);
const stimuli = data[0].data;


module.exports = () => {
  return db
    .knex(`${quiz}_stimuli`)
    .del()
    .then(() => {
console.log('blah', stimuli);
var formatted_stimuli = function parser() {
  const b =  stimuli.map(el => {
    el.choices = JSON.parse(el.choices)
    return el
  })
  return b
}

console.log(formatted_stimuli)
      return db.knex('short-quiz_stimuli').insert(formatted_stimuli).returning('*');
    })
    .then(data => {

      console.log('I am data',data); // eslint-disable-line no-console
    })
    .then(() => {
      console.log('done seeding!');
      return process.exit();
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
    });
}; */


const Papa = require('babyparse');
const fs = require('fs');
const path = require('path');
const modelObj = require('../../db');
const flatten = require('lodash.flatten');

let quiz = path.resolve(__dirname).split('/').pop();
const db = modelObj[quiz];
const data = Papa.parseFiles(
  [
    `./seeds/${quiz}/stimuli.csv`
  ],
  { header: true }
);
const stimuli = data[0].data;
module.exports = () => {
  return db
    .knex(`${quiz}_stimuli`)
    .del()
    .then(() => {
      return db.knex(`${quiz}_stimuli`).insert(stimuli).returning('*');
    })
    .then(data => {
      console.log(data); // eslint-disable-line no-console
    })
    .then(() => {
      console.log('done seeding!');
      return process.exit();
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
    });
};

