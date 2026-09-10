import { AnswersRepository } from "../repositories/answers-repository.js";
import { Answer } from "../../enterprise/entities/answer.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { AnswerComment, AnswerCommentProps } from "../../enterprise/entities/answer-comment.js";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js";
import { Either, left, right } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either< 
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository, 
    private answerCommentsRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if(!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment);

    return right({
      answerComment,
    });
  }
}
