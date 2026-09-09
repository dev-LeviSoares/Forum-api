import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment.js";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  // O Partial<> torna todos os campos passados em opicionais
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override
    },
    id,
  )

  return questionComment
}