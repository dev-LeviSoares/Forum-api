import { Question } from "../../enterprise/entities/question.js";
import { PaginationParams } from "../../enterprise/repositories/pagination-params.js";

export interface QuestionRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
}