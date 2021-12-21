import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondRepository } from '../condominium.repository';
import { CondominiumService } from '../condominium.service';
import { mockCond, mockCondStub } from './mockCond';

describe('CondominiumService', () => {
  let service: CondominiumService;

  const mockCondRepository = {
    find: jest.fn().mockResolvedValue([mockCondStub(), mockCondStub()]),
    findOne: jest.fn().mockResolvedValue(mockCondStub()),
    createCond: jest.fn().mockResolvedValue(mockCondStub()),
    updateCond: jest.fn().mockResolvedValue(mockCondStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CondominiumService,
        {
          provide: getRepositoryToken(CondRepository),
          useValue: mockCondRepository,
        },
      ],
    }).compile();

    service = module.get<CondominiumService>(CondominiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find condiminiuns', () => {
    it('shoul be able to list all condominiun', async () => {
      const all = await service.findAll();

      expect(all).toMatchObject([mockCondStub(), mockCondStub()]);
      expect(mockCondRepository.find).toBeCalledTimes(1);
    });

    it('shoule be able to find an condominium by id', async () => {
      const cond = await service.findOne(mockCondStub().id);

      expect(cond).toHaveProperty('id');
      expect(mockCondRepository.findOne).toBeCalledTimes(1);
    });

    it('shoule return empty when cond is not found', async () => {
      jest.spyOn(mockCondRepository, 'findOne').mockResolvedValueOnce([]);
      const cond = await service.findOne(mockCondStub().id);

      expect(cond).toMatchObject([]);
      expect(mockCondRepository.findOne).toBeCalledTimes(2);
    });
  });

  describe('When create condominion', () => {
    it('should create an condominium', async () => {
      const create = await service.create(mockCond());

      expect(create).toMatchObject(mockCondStub());
    });
  });

  describe('When update cond', () => {
    it('shoud update condi data', async () => {
      const update = await service.update(mockCondStub().id, mockCond());

      expect(update).toMatchObject(mockCondStub());
    });
  });
});
