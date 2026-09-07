import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { EditQuestionUseCase } from './edit-question.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  })

  it('should be able to edit a question', async () => {

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);
  
    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    });
    
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteudo teste'
    });
  })

  it('should be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      }, 
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    
    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteudo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
