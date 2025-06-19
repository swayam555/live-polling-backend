// store/studentStore.js

const { v4: uuidv4 } = require('uuid');

const students = new Map(); // tabId -> student object

function addStudent(name, tabId) {
  const id = uuidv4();
  const student = { id, name, tabId };
  students.set(tabId, student);
  return student;
}

function getStudentByTabId(tabId) {
  return students.get(tabId);
}

function getAllStudents() {
  return new Map([...students.values()].map((s) => [s.id, s]));
}

function resetStudents() {
  students.clear();
}

module.exports = {
  addStudent,
  getStudentByTabId,
  getAllStudents,
  resetStudents
};
