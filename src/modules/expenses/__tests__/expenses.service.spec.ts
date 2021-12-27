import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpensesRepository } from '../expenses.repository';
import { ExpensesService } from '../expenses.service';
import { mockExpensesRepositoty, mockExpense } from './mockRepository';

describe('ExpansesService', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getRepositoryToken(ExpensesRepository),
          useValue: mockExpensesRepositoty,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When list expenses', () => {
    it('should be able to list all expences by month and year', async () => {
      const { month, year } = mockExpense();

      const expenses = await service.findAll(month, year);

      expect(expenses).toEqual(mockExpense());
    });
  });

  describe('When create expenses', () => {
    it('shoul create an expense', async () => {
      const create = await service.create(mockExpense());
      expect(create).toEqual(mockExpense());
    });
  });

  describe('When update expenses', () => {
    it('shoul update an expense', async () => {
      const update = await service.update(mockExpense().id, mockExpense());
      expect(update).toEqual(mockExpense());
    });
  });

  describe('When remove expenses', () => {
    it('shoul remove an expense', async () => {
      const remove = await service.remove(mockExpense().id);
      expect(remove).toEqual(mockExpense());
    });
  });
});
