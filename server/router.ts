import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
import * as subjectController from './controllers/subject.controller';
import * as lessonController from './controllers/lesson.controller';
const router = Router();

//user routes
router.post('/user', userController.createUser);
router.get('/user/:unique', userController.getUserByIdOrUsername);
router.put('/user/:id', userController.updateUser);
router.put('/user/:id/:lessonId', userController.addLessonId);

//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:id', schoolController.getUsers);
router.get('/school/:id/subjects', schoolController.getSubjects);

//subject routes
router.post('/subject', subjectController.createSubject);

//lessons routes
router.post('/lesson', lessonController.createLesson);

export default router;










// const user = await prisma.user.findUnique({
//   where: {
//     email: 'eloise@prisma.io',
//   },
// })

// if (user) {
//   console.log(user.coinflips)

//   user.coinflips.push(true, true, false)

//   const updatedUser = await prisma.user.update({
//     where: {
//       email: 'eloise@prisma.io',
//     },
//     data: {
//       coinflips: user.coinflips,
//     },
//   })

//   console.log(updatedUser.coinflips)
// }
