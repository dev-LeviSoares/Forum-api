import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objetct/slug.js";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  // O Partial<> torna todos os campos passados em opicionais
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.text(),
      ...override
    },
    id,
  )

  return question
}