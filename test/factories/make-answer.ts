import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objetct/slug.js";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  // O Partial<> torna todos os campos passados em opicionais
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override
    },
    id,
  )

  return answer
}