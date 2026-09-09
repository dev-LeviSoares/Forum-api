import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment.js";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  // O Partial<> torna todos os campos passados em opicionais
  id?: UniqueEntityID
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override
    },
    id,
  )

  return answerComment
}