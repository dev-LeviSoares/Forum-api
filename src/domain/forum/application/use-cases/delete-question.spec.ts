import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { DeleteQuestionUseCase } from './delete-question.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  })

  it('should be able to delete a question', async () => {

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);
  
    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1'
    });
    
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  })

  it('should be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    
    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
