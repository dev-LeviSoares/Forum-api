import { makeAnswer } from "../../../../../test/factories/make-answer.js";
import { makeQuestion } from "../../../../../test/factories/make-question.js";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository.js";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js";
import { DeleteAnswerUseCase } from "./delete-answer.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository();

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository,
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionRepository.items[0]!.bestAnswerId).toEqual(answer.id);
  });

  it("should not be able to chosse another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    });

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-2",
    });
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  });
});
