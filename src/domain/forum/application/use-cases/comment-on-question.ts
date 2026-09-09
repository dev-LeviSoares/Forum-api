import { QuestionRepository } from "../repositories/questions-repository.js";
import { Question } from "../../enterprise/entities/question.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { QuestionComment, QuestionCommentProps } from "../../enterprise/entities/question-comment.js";
import { QuestionCommentRepository } from "../repositories/question-comments-repository.js";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository, 
    private questionCommentsRepository: QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if(!question) {
      throw new Error('Question not found.');
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
