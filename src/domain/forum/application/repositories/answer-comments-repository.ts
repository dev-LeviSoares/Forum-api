import { AnswerComment } from "../../enterprise/entities/answer-comment.js"

export interface AnswerCommentRepository {
  create(answer: AnswerComment): Promise<void>
  delete(answer: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
}