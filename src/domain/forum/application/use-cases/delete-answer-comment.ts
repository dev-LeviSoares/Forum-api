import { Either, left, right } from "@/core/either.js";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteCommentAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if(!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if(answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
