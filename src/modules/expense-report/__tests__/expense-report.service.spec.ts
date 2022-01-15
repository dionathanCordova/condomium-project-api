import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpenseReportRepository } from '../expense-report.repository';
import { ExpenseReportService } from '../expense-report.service';
import { mockExpense, mockExpenseReport } from './mockExpenseReport';

describe('ExpenseReportService', () => {
  let service: ExpenseReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseReportService,
        {
          provide: getRepositoryToken(ExpenseReportRepository),
          useValue: mockExpenseReport,
        },
      ],
    }).compile();

    service = module.get<ExpenseReportService>(ExpenseReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create expense report', () => {
    it('should create expanse', async () => {
      jest.spyOn(mockExpenseReport, 'findOne').mockResolvedValueOnce(null);

      const create = await service.create(mockExpense());

      expect(create).toEqual(mockExpense());
    });

    it('should throw error when report already exists', async () => {
      try {
        mockExpenseReport.createExpenseReport.mockRejectedValueOnce(
          new Error(),
        );

        await service.create(mockExpense());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('When find some expanse report', () => {
    it('should be return one expanse report', async () => {
      const { month, year, condominium_id } = mockExpense();

      const report = await service.findOne(month, year, condominium_id);
      expect(report).toEqual(mockExpense());
    });
  });

  describe('When update expense report', () => {
    it('should update the expense report', async () => {
      const { id } = mockExpense();

      const update = await service.update(id, mockExpense());
      expect(update).toEqual(mockExpense());
    });

    it('should throw error when report id is not found', async () => {
      try {
        mockExpenseReport.updateExpenseReport.mockRejectedValueOnce(
          new Error(),
        );

        await service.update('teste', mockExpense());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
