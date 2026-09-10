import { Either, left, right } from "@/core/either.js";
import { QuestionCommentRepository } from "../repositories/question-comments-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if(!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if(questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
