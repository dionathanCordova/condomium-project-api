import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GasExpensesRepository } from '../gas-expenses.repository';
import { GasExpensesService } from '../gas-expenses.service';
import { mockGasExpenses, mockGasExpensesRepository } from './mockGasExpenses';

describe('ExpenseReportService', () => {
  let service: GasExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GasExpensesService,
        {
          provide: getRepositoryToken(GasExpensesRepository),
          useValue: mockGasExpensesRepository,
        },
      ],
    }).compile();

    service = module.get<GasExpensesService>(GasExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create expense report', () => {
    it('should create expanse', async () => {
      jest
        .spyOn(mockGasExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const create = await service.create(mockGasExpenses());

      expect(create).toEqual(mockGasExpenses());
    });

    it('should throw error when report already exists', async () => {
      try {
        mockGasExpensesRepository.createGasExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.create(mockGasExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('When find some expanse report', () => {
    it('should be return one expanse report', async () => {
      const { month, year, condominium_id } = mockGasExpenses();

      const report = await service.findOne(month, year, condominium_id);
      expect(report).toEqual(mockGasExpenses());
    });
  });

  describe('When update expense report', () => {
    it('should update the expense report', async () => {
      const { id } = mockGasExpenses();

      const update = await service.update(id, mockGasExpenses());
      expect(update).toEqual(mockGasExpenses());
    });

    it('should throw error when report id is not found', async () => {
      try {
        mockGasExpensesRepository.updateGasExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.update('teste', mockGasExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
