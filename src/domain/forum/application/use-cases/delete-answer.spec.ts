import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-answer-repository.js';
import { DeleteAnswerUseCase } from './delete-answer.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  })

  it('should be able to delete a answer', async () => {

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);
  
    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    });
    
    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  })

  it('should be not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);
    
    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
