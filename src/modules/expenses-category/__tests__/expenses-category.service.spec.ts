import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpensesCategoryRepository } from '../expences-category.repository';
import { ExpensesCategoryService } from '../expenses-category.service';
import { mockExpense, mockExpensesCategoryRepository } from './mockExpences';

describe('ExpensesCategoryService', () => {
  let service: ExpensesCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesCategoryService,
        {
          provide: getRepositoryToken(ExpensesCategoryRepository),
          useValue: mockExpensesCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ExpensesCategoryService>(ExpensesCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When list expenses category', () => {
    it('should be able to list all expences by month', async () => {
      const expenses = await service.findAll();

      expect(expenses).toEqual(mockExpense());
    });
  });

  describe('When create expenses category', () => {
    it('shoul create an category', async () => {
      const create = await service.create(mockExpense());
      expect(create).toEqual(mockExpense());
    });
  });

  describe('When update expenses category', () => {
    it('shoul update an category', async () => {
      const update = await service.update(mockExpense().id, mockExpense());
      expect(update).toEqual(mockExpense());
    });
  });

  describe('When remove expenses category', () => {
    it('shoul remove an category', async () => {
      const remove = await service.remove(mockExpense().id);
      expect(remove).toEqual(mockExpense());
    });
  });
});
