import express from "express";
const router = express.Router();

import { QuizController } from "../controller/Quiz.controller";

router.get("/genres", QuizController.getGenres);
router.get("/genres/:genreId", QuizController.getGenreById);
router.get("/genres/:genreId/questions", QuizController.getQuestionsByGenre);

router.post("/attempts/start", QuizController.startAttempt);
router.post("/attempts/:attemptId/answer", QuizController.answerQuestion);
router.post("/attempts/:attemptId/complete", QuizController.completeAttempt);

router.get("/attempts/user/:userId", QuizController.getUserAttempts);
router.get("/attempts/:attemptId", QuizController.getAttemptById);

export default router;
