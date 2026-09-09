import { makeQuestion } from "../../../../../test/factories/make-question.js";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comments-repository.js";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { CommentOnQuestionUseCase } from "./comment-on-question.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment On Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste'
    });

    expect(inMemoryQuestionCommentsRepository.items[0]!.content).toEqual(
      'Comentário teste'
    );
  });
});
