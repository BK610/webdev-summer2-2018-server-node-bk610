var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function findEnrollmentByPair(pair) {
    var response = enrollmentModel.findOne(pair);
    return response;
}

// function findEnrollmentById(enrollmentId) {
//     return enrollmentModel.findById(enrollmentId);
// }

function enrollStudentInSection(enrollment) {
    console.log(enrollment);
    return enrollmentModel.create(enrollment);
}

function unenrollStudentInSection(enrollmentId) {
    return enrollmentModel.remove({_id: enrollmentId});
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    findEnrollmentByPair: findEnrollmentByPair,
    unenrollStudentInSection: unenrollStudentInSection,
    // findEnrollmentById: findEnrollmentById
};
