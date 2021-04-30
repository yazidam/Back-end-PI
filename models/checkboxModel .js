// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let checkboxModel = new Schema(
//   {
//     checkbox: {
//       type: String,
//     },
//     username: {
//       type: String,
//     },

//     adresse: {
//       type: String,
//     },
//     email: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     description: {
//       type: String,
//       //required: [true, 'description number required'],
//     },
//     from: {
//       type: String,
//       //required: [true, 'from number required']
//     },
//     to: {
//       type: String,
//       //required: [true, 'to number required']
//     },
//     userId: { type: String },
//     companyId: { type: String },
//   },
//   {
//     collection: 'checkboxes',
//   }
// );

// module.exports = mongoose.model('CheckboxModel', checkboxModel);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let checkboxModel = new Schema(
  {
    checkbox: {
      type: String,
    },
  },
  {
    collection: 'checkboxes',
  }
);

module.exports = mongoose.model('CheckboxModel', checkboxModel);
