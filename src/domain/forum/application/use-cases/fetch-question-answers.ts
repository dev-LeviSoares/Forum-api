import { Answer } from "../../enterprise/entities/answer.js";
import { AnswersRepository } from "../repositories/answers-repository.js";

interface FecthQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FecthQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FecthQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page
  }: FecthQuestionAnswersUseCaseRequest): Promise<FecthQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return {
      answers
    };
  }
}
