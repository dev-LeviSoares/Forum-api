import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { FecthRecentQuestionUseCase } from './fetch-recent-questions.js';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: FecthRecentQuestionUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new FecthRecentQuestionUseCase(inMemoryQuestionsRepository);
  })

  it('should be able to fetch recent questions', async () => {

    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20)}))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18)}))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23)}))
  
    const { questions } = await sut.execute({
      page: 1
    })
  
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23)}),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20)}),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18)})
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {

    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }
  
    const { questions } = await sut.execute({
      page: 2
    })
  
    expect(questions).toHaveLength(2)
  })
})
