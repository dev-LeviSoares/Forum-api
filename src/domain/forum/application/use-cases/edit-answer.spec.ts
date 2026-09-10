import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-answer-repository.js';
import { EditAnswerUseCase } from './edit-answer.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { NotAllowedError } from './errors/not-allowed-error.js';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase

describe('Edit Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  })

  it('should be able to edit a answers', async () => {

    const newAnswers = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('answers-1')
    );

    await inMemoryAnswersRepository.create(newAnswers);
  
    await sut.execute({
      answerId: newAnswers.id.toValue(),
      authorId: 'author-1',
      content: 'Conteudo teste',
    });
    
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste'
    });
  })

  it('should be able to edit a answers from another user', async () => {
    const newAnswers = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('answers-1')
    );

    await inMemoryAnswersRepository.create(newAnswers);
    
    const result = await sut.execute({
      answerId: newAnswers.id.toValue(),
      authorId: 'author-2',
      content: 'Conteudo teste',
    })
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
