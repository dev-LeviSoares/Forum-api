import { QuestionRepository } from "../repositories/questions-repository.js";
import { Question } from "../../enterprise/entities/question.js";
import { Either, right } from "@/core/either.js";

interface FecthRecentQuestionUseCaseRequest {
 page: number
}

type FecthRecentQuestionUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>

export class FecthRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page
  }: FecthRecentQuestionUseCaseRequest): Promise<FecthRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({
      questions
    });
  }
}
