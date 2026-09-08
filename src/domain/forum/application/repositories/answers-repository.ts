import { Answer } from "@/domain/forum/enterprise/entities/answer.js";
import { PaginationParams } from "../../enterprise/repositories/pagination-params.js";

export interface AnswersRepository {
  findById(id: string): Promise <Answer | null>
  findManyByQuestionId(id: string, params: PaginationParams): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}