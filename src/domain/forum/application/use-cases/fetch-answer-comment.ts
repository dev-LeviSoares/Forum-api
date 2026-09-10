import { Either, right } from "@/core/either.js";
import { AnswerComment } from "../../enterprise/entities/answer-comment.js";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js";

interface FecthAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FecthAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>

export class FecthAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page
  }: FecthAnswerCommentsUseCaseRequest): Promise<FecthAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

    return right({
      answerComments
    });
  }
}
