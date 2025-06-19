// controllers/studentController.js

const { addStudent, getStudentByTabId } = require('../store/studentStore');

exports.registerStudent = (req, res) => {
  const { name, tabId } = req.body;

  if (!name || !tabId) {
    return res.status(400).json({ message: "Name and tabId are required" });
  }

  const existing = getStudentByTabId(tabId);
  if (existing) {
    return res.status(200).json({ studentId: existing.id, message: "Already registered" });
  }

  const student = addStudent(name, tabId);
  res.status(201).json({ studentId: student.id });
};
