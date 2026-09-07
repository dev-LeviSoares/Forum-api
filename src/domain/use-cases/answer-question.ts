import { UniqueEntityID } from "../../core/entities/unique-entity-id.js";
import { AnswersRepository } from "../answers-repository.js";
import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) {}
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    });

    this.answersRepository.create(answer)

    return answer;
  }
}