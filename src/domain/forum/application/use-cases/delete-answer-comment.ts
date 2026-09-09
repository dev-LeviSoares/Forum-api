import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerUseCaseResponse {}

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
      throw new Error('Answer comment not found.');
    }

    if(answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
