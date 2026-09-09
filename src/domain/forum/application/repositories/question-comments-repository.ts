import { QuestionComment } from "../../enterprise/entities/question-comment.js";
import { PaginationParams } from "../../enterprise/repositories/pagination-params.js";

export interface QuestionCommentRepository {
  create(question: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
}