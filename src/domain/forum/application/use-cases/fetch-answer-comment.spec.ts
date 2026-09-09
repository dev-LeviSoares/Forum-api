import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { InMemoryAnswerCommentRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js';
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.js';
import { FecthAnswerCommentsUseCase } from './fetch-answer-comment.js';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: FecthAnswerCommentsUseCase

describe('Fetch Answer Answers', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
    sut = new FecthAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  })

  it('should be able to fetch answer answers', async () => {

    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))
    
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))
    
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))
    
  
    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })
  
    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer answers', async () => {

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      }))
    }
  
    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })
  
    expect(answerComments).toHaveLength(2)
  })
})
