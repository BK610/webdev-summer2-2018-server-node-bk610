let mongoose = require('mongoose');
let questionSchema = require('./question.schema.server');
let questionModel = mongoose.model('QuestionModel', questionSchema);

