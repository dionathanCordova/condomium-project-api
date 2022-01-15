import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WaterExpensesRepository } from '../water-expenses.repository';
import { WaterExpensesService } from '../water-expenses.service';
import {
  mockWaterExpenses,
  mockWaterExpensesRepository,
} from './mockWaterExpenses';

describe('ExpenseReportService', () => {
  let service: WaterExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterExpensesService,
        {
          provide: getRepositoryToken(WaterExpensesRepository),
          useValue: mockWaterExpensesRepository,
        },
      ],
    }).compile();

    service = module.get<WaterExpensesService>(WaterExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create expense report', () => {
    it('should create expanse', async () => {
      jest
        .spyOn(mockWaterExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const create = await service.create(mockWaterExpenses());

      expect(create).toEqual(mockWaterExpenses());
    });

    it('should throw error when report already exists', async () => {
      try {
        mockWaterExpensesRepository.createWaterExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.create(mockWaterExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('When find some expanse report', () => {
    it('should be return one expanse report', async () => {
      const { month, year, condominium_id } = mockWaterExpenses();

      const report = await service.findOne(month, year, condominium_id);
      expect(report).toEqual(mockWaterExpenses());
    });
  });

  describe('When update expense report', () => {
    it('should update the expense report', async () => {
      const { id } = mockWaterExpenses();

      const update = await service.update(id, mockWaterExpenses());
      expect(update).toEqual(mockWaterExpenses());
    });

    it('should throw error when report id is not found', async () => {
      try {
        mockWaterExpensesRepository.updateWaterExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.update('teste', mockWaterExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
