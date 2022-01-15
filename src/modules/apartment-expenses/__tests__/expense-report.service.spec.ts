import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApartmentExpensesRepository } from '../apartment-expenses.repository';
import { ApartmentExpensesService } from '../apartment-expenses.service';
import {
  mockApartmentExpenses,
  mockApartmentExpensesRepository,
} from './mockApartmentExpenses';

describe('ExpenseReportService', () => {
  let service: ApartmentExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentExpensesService,
        {
          provide: getRepositoryToken(ApartmentExpensesRepository),
          useValue: mockApartmentExpensesRepository,
        },
      ],
    }).compile();

    service = module.get<ApartmentExpensesService>(ApartmentExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create expense report', () => {
    it('should create expanse', async () => {
      jest
        .spyOn(mockApartmentExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const create = await service.create(mockApartmentExpenses());

      expect(create).toEqual(mockApartmentExpenses());
    });

    it('should throw error when report already exists', async () => {
      try {
        mockApartmentExpensesRepository.createApartmentExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.create(mockApartmentExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('When find some expanse report', () => {
    it('should be return one expanse report', async () => {
      const { month, year, condominium_id } = mockApartmentExpenses();

      const report = await service.findOne(month, year, condominium_id);
      expect(report).toEqual(mockApartmentExpenses());
    });
  });

  describe('When update expense report', () => {
    it('should update the expense report', async () => {
      const { id } = mockApartmentExpenses();

      const update = await service.update(id, mockApartmentExpenses());
      expect(update).toEqual(mockApartmentExpenses());
    });

    it('should throw error when report id is not found', async () => {
      try {
        mockApartmentExpensesRepository.updateApartmentExpenses.mockRejectedValueOnce(
          new Error(),
        );

        await service.update('teste', mockApartmentExpenses());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
