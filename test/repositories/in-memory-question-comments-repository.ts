import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository.js";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.js";
import { PaginationParams } from "@/domain/forum/enterprise/repositories/pagination-params.js";

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex( item => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id);

    if(!question) {
      return null
    }

    return question
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }
}
