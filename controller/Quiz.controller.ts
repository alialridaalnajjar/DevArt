import { Request, Response } from "express";
import sequelize from "../db";

export class QuizController {
  static async getGenres(req: Request, res: Response) {
    try {
      const [genres]: any = await sequelize.query(
        "SELECT genre_id, name, description, total_questions, pass_score, created_at FROM quiz_genres ORDER BY name"
      );

      return res.status(200).json({ genres });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getGenreById(req: Request, res: Response) {
    try {
      const genreId = req.params.genreId;
      const [genres]: any = await sequelize.query(
        "SELECT genre_id, name, description, total_questions, pass_score, created_at FROM quiz_genres WHERE genre_id = $1",
        { bind: [genreId] }
      );

      if (genres.length === 0) {
        return res.status(404).json({ message: "Genre not found" });
      }

      return res.status(200).json({ genre: genres[0] });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getQuestionsByGenre(req: Request, res: Response) {
    try {
      const genreId = req.params.genreId;

      const [genres]: any = await sequelize.query(
        "SELECT total_questions FROM quiz_genres WHERE genre_id = $1",
        { bind: [genreId] }
      );

      if (genres.length === 0) {
        return res.status(404).json({ message: "Genre not found" });
      }

      const totalQuestions = genres[0].total_questions;

      const [questions]: any = await sequelize.query(
        "SELECT question_id, question FROM quiz_questions WHERE genre_id = $1 ORDER BY random() LIMIT $2",
        { bind: [genreId, totalQuestions] }
      );

      if (questions.length === 0) {
        return res.status(404).json({ message: "No questions found" });
      }

      const questionIds = questions.map((q: any) => q.question_id);

      const [options]: any = await sequelize.query(
        "SELECT option_id, question_id, option_text FROM quiz_options WHERE question_id = ANY($1)",
        { bind: [questionIds] }
      );

      const optionsByQuestion = options.reduce((acc: any, opt: any) => {
        if (!acc[opt.question_id]) acc[opt.question_id] = [];
        acc[opt.question_id].push({
          option_id: opt.option_id,
          option_text: opt.option_text,
        });
        return acc;
      }, {});

      const payload = questions.map((q: any) => ({
        question_id: q.question_id,
        question: q.question,
        options: optionsByQuestion[q.question_id] || [],
      }));

      return res.status(200).json({ questions: payload });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async startAttempt(req: Request, res: Response) {
    try {
      const { user_id, genre_id } = req.body;

      if (!user_id || !genre_id) {
        return res.status(400).json({ message: "user_id and genre_id are required" });
      }

      const [attempts]: any = await sequelize.query(
        "INSERT INTO quiz_attempts (user_id, genre_id) VALUES ($1, $2) RETURNING attempt_id, user_id, genre_id, started_at",
        { bind: [user_id, genre_id] }
      );

      return res.status(201).json({ attempt: attempts[0] });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async answerQuestion(req: Request, res: Response) {
    try {
      const attemptId = req.params.attemptId;
      const { question_id, option_id } = req.body;

      if (!question_id || !option_id) {
        return res.status(400).json({ message: "question_id and option_id are required" });
      }

      const [attempts]: any = await sequelize.query(
        "SELECT attempt_id, completed_at FROM quiz_attempts WHERE attempt_id = $1",
        { bind: [attemptId] }
      );

      if (attempts.length === 0) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      if (attempts[0].completed_at) {
        return res.status(400).json({ message: "Attempt already completed" });
      }

      const [options]: any = await sequelize.query(
        "SELECT option_id, question_id, is_correct FROM quiz_options WHERE option_id = $1",
        { bind: [option_id] }
      );

      if (options.length === 0) {
        return res.status(404).json({ message: "Option not found" });
      }

      if (options[0].question_id !== Number(question_id)) {
        return res.status(400).json({ message: "Option does not match question" });
      }

      await sequelize.query(
        "DELETE FROM quiz_answers WHERE attempt_id = $1 AND question_id = $2",
        { bind: [attemptId, question_id] }
      );

      await sequelize.query(
        "INSERT INTO quiz_answers (attempt_id, question_id, option_id, is_correct) VALUES ($1, $2, $3, $4)",
        { bind: [attemptId, question_id, option_id, options[0].is_correct] }
      );

      return res.status(200).json({
        message: "Answer saved",
        is_correct: options[0].is_correct,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async completeAttempt(req: Request, res: Response) {
    try {
      const attemptId = req.params.attemptId;

      const [attempts]: any = await sequelize.query(
        "SELECT a.attempt_id, a.genre_id, a.completed_at, g.pass_score FROM quiz_attempts a JOIN quiz_genres g ON g.genre_id = a.genre_id WHERE a.attempt_id = $1",
        { bind: [attemptId] }
      );

      if (attempts.length === 0) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      if (attempts[0].completed_at) {
        return res.status(400).json({ message: "Attempt already completed" });
      }

      const [scores]: any = await sequelize.query(
        "SELECT COUNT(*)::int AS score FROM quiz_answers WHERE attempt_id = $1 AND is_correct = true",
        { bind: [attemptId] }
      );

      const score = scores[0]?.score ?? 0;
      const passed = score >= attempts[0].pass_score;

      const [updated]: any = await sequelize.query(
        "UPDATE quiz_attempts SET score = $1, passed = $2, completed_at = NOW() WHERE attempt_id = $3 RETURNING attempt_id, user_id, genre_id, score, passed, started_at, completed_at",
        { bind: [score, passed, attemptId] }
      );

      return res.status(200).json({ attempt: updated[0] });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserAttempts(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const [attempts]: any = await sequelize.query(
        "SELECT a.attempt_id, a.user_id, a.genre_id, g.name AS genre_name, g.total_questions, g.pass_score, a.score, a.passed, a.started_at, a.completed_at FROM quiz_attempts a JOIN quiz_genres g ON g.genre_id = a.genre_id WHERE a.user_id = $1 ORDER BY a.started_at DESC",
        { bind: [userId] }
      );

      return res.status(200).json({ attempts });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAttemptById(req: Request, res: Response) {
    try {
      const attemptId = req.params.attemptId;

      const [attempts]: any = await sequelize.query(
        "SELECT a.attempt_id, a.user_id, a.genre_id, g.name AS genre_name, g.total_questions, g.pass_score, a.score, a.passed, a.started_at, a.completed_at FROM quiz_attempts a JOIN quiz_genres g ON g.genre_id = a.genre_id WHERE a.attempt_id = $1",
        { bind: [attemptId] }
      );

      if (attempts.length === 0) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      const [answers]: any = await sequelize.query(
        "SELECT qa.answer_id, qa.question_id, qq.question, qa.option_id, qo.option_text, qa.is_correct FROM quiz_answers qa JOIN quiz_questions qq ON qq.question_id = qa.question_id JOIN quiz_options qo ON qo.option_id = qa.option_id WHERE qa.attempt_id = $1",
        { bind: [attemptId] }
      );

      return res.status(200).json({ 
        attempt: {
          ...attempts[0],
          answers
        }
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
