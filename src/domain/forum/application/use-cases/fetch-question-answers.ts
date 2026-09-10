import { Either, right } from "@/core/either.js";
import { Answer } from "../../enterprise/entities/answer.js";
import { AnswersRepository } from "../repositories/answers-repository.js";

interface FecthQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FecthQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>

export class FecthQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page
  }: FecthQuestionAnswersUseCaseRequest): Promise<FecthQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({
      answers
    });
  }
}
