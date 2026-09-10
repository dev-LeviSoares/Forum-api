import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { InMemoryQuestionCommentRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js';
import { FecthQuestionCommentsUseCase } from './fetch-question-comments.js';
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.js';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: FecthQuestionCommentsUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository();
    sut = new FecthQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  })

  it('should be able to fetch question answers', async () => {

    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    
  
    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })
  
    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {

    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
      }))
    }
  
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })
  
    expect(result.value?.questionComments).toHaveLength(2)
  })
})
