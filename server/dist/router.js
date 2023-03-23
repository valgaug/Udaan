"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("./controllers/user.controller"));
const schoolController = __importStar(require("./controllers/school.controller"));
const subjectController = __importStar(require("./controllers/subject.controller"));
const lessonController = __importStar(require("./controllers/lesson.controller"));
const libraryController = __importStar(require("./controllers/library.controller"));
const noteBookController = __importStar(require("./controllers/noteBook.controller"));
const router = (0, express_1.Router)();
//user routes
router.post('/user', userController.createUser);
router.get('/user/:userId/id', userController.getUserById);
router.get('/user/:username/username', userController.getUserByUsername);
router.put('/user/:userId', userController.updateUser);
//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:schoolId/users', schoolController.getUsers);
router.get('/school/:schoolId/subjects', schoolController.getSubjects);
//subject routes
router.post('/subject', subjectController.createSubject);
router.delete('/subject/:subjectId', subjectController.deleteSubject);
//lessons routes
router.post('/lesson', lessonController.createLesson);
router.delete('/lesson/:lessonId', lessonController.deleteLesson);
router.get('/lesson/:lessonId', lessonController.getLesson);
router.put('/lesson/:lessonId', lessonController.updateLesson);
//library routes
router.put('/library/:userId/:lessonId', libraryController.addLessonId);
router.get('/library/:userId/library', libraryController.getLessons);
// router.get('/library/:id/notes', libraryController.getNotes);
router.delete('/library/:userId/library/:lessonId', libraryController.deleteLessonFromLibrary);
router.get('/user/:id/library/:lessonId', libraryController.getLesson);
//noteBook routes
router.post('/noteBook', noteBookController.createNote);
exports.default = router;
