import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-answer-repository.js';
import { FecthQuestionAnswersUseCase } from './fetch-question-answers.js';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: FecthQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new FecthQuestionAnswersUseCase(inMemoryAnswersRepository);
  })

  it('should be able to fetch question answers', async () => {

    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
  
    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })
  
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }
  
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })
  
    expect(result.value?.answers).toHaveLength(2)
  })
})
