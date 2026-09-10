import { QuestionRepository } from "../repositories/questions-repository.js";
import { Question } from "../../enterprise/entities/question.js";
import { AnswersRepository } from "../repositories/answers-repository.js";
import { Either, left, right } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either< 
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    
    const answer = await this.answerRepository.findById(answerId);
    
    if(!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepository.findById(answer.questionId.toString());

    if(!question) {
      return left(new ResourceNotFoundError());
    }


    if(authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return right({
      question,
    });
  }
}
