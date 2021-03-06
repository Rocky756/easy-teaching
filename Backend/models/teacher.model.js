const { Schema, model } = require('mongoose');

const teacherSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    languages: Array,
    lessons: [Object],
    level: String,
    gender: String,
    // students: [{
    //   id: String,
    //   firstname: String,
    //   lastname: String,
    // }],
    students: [{
      id: String,
    }],
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    introduction: String,
  },
);

module.exports = model('Teacher', teacherSchema);
