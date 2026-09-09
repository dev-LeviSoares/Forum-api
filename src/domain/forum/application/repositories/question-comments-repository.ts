import { QuestionComment } from "../../enterprise/entities/question-comment.js";

export interface QuestionCommentRepository {
  create(question: QuestionComment): Promise<void>
}