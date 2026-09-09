import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { makeQuestionComment } from "../../../../../test/factories/make-question-comment.js";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comments-repository.js";
import { DeleteCommentQuestionUseCase } from "./delete-question-comment.js";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: DeleteCommentQuestionUseCase;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository();

    sut = new DeleteCommentQuestionUseCase(
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    expect(() => {
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  });
});
