import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository.js";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.js";
import { PaginationParams } from "@/domain/forum/enterprise/repositories/pagination-params.js";

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answer: AnswerComment) {
    const itemIndex = this.items.findIndex( item => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: String) {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if(!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }
}