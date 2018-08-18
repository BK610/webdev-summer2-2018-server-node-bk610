module.exports = function (app) {
    var sectionModel = require('../../models/section/section.model.server');
    var enrollmentModel = require('../../models/enrollment/enrollment.model.server');

    function enrollStudentInSection(req, res) {
        var studentId = req.params['studentId'];
        var sectionId = req.params['sectionId'];
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        enrollmentModel.enrollStudentInSection(enrollment)
            .then(response => res.send(response.json()))
            .then(() => {
                enrollmentModel.findEnrollmentByPair(enrollment)
                    .then(enrollment => {
                        sectionModel.decrementSectionSeats(enrollment.section);
                        res.send(enrollment.json());
                    })
            });
    }

    function findSectionsForStudent(req, res) {
        var studentId = req.params['studentId'];
        enrollmentModel.findSectionsForStudent(studentId)
            .then(response => res.send(response.json()));
    }

    function unenrollStudentInSection(req, res) {
        var studentId = req.params['sectionId'];
        var sectionId = req.params['sectionId'];
        var unenrollment = {
            student: studentId,
            section: sectionId
        }
        enrollmentModel.unenrollStudentInSection(unenrollment)
            .then(response => {
                res.send(response.json())
            })
            .then(() => {
                enrollmentModel.findEnrollmentByPair(unenrollment)
                    .then(enrollment => {
                        sectionModel.incrementSectionSeats(enrollment.section);
                        res.send(enrollment.json());
                    })
            });
    }

    app.post('/api/student/:studentId/section/:sectionId', enrollStudentInSection);
    app.delete('/api/student/:studentId/section/:sectionId', unenrollStudentInSection);
    app.get('/api/student/:studentId/section', findSectionsForStudent);
}