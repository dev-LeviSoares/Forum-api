import { AnswerComment } from "../../enterprise/entities/answer-comment.js";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js";

interface FecthAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FecthAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FecthAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page
  }: FecthAnswerCommentsUseCaseRequest): Promise<FecthAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

    return {
      answerComments
    };
  }
}
