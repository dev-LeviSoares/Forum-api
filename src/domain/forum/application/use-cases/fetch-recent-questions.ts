import { QuestionRepository } from "../repositories/questions-repository.js";
import { Question } from "../../enterprise/entities/question.js";

interface FecthRecentQuestionUseCaseRequest {
 page: number
}

interface FecthRecentQuestionUseCaseResponse {
  questions: Question[];
}

export class FecthRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page
  }: FecthRecentQuestionUseCaseRequest): Promise<FecthRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return {
      questions
    };
  }
}
