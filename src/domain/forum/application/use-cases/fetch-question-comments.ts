import { Either, right } from "@/core/either.js";
import { QuestionComment } from "../../enterprise/entities/question-comment.js";
import { QuestionCommentRepository } from "../repositories/question-comments-repository.js";

interface FecthQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FecthQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>

export class FecthQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page
  }: FecthQuestionCommentsUseCaseRequest): Promise<FecthQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

    return right({
      questionComments
    });
  }
}
