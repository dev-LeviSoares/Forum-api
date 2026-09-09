import { AnswerComment } from "../../enterprise/entities/answer-comment.js"
import { PaginationParams } from "../../enterprise/repositories/pagination-params.js"

export interface AnswerCommentRepository {
  create(answer: AnswerComment): Promise<void>
  delete(answer: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(questionId: string, params: PaginationParams): Promise<AnswerComment[]>
}