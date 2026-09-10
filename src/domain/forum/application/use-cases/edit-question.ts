import { Either, left, right } from "@/core/either.js";
import { Question } from "../../enterprise/entities/question.js";
import { QuestionRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()) {
      return left(new ResourceNotFoundError())
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return right({
      question
    })
  }
}
