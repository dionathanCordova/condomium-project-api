import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondominiumAddressRepository } from '../condominium-address.repository';
import { CondominiumAddressService } from '../condominium-address.service';
import {
  mockCondominiumAddressRepository,
  mockCondominiumStub,
} from './mockCondominiumAddress';

describe('CondominiumService', () => {
  let service: CondominiumAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CondominiumAddressService,
        {
          provide: getRepositoryToken(CondominiumAddressRepository),
          useValue: mockCondominiumAddressRepository,
        },
      ],
    }).compile();

    service = module.get<CondominiumAddressService>(CondominiumAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find condiminium address', () => {
    it('shoul be able to list all condominiun', async () => {
      const all = await service.findAll();

      expect(all).toMatchObject(mockCondominiumStub());
      expect(mockCondominiumAddressRepository.find).toBeCalledTimes(1);
    });

    it('shoule be able to find an condominium by id', async () => {
      const cond = await service.findOne(mockCondominiumStub().id);

      expect(cond).toHaveProperty('id');
      expect(mockCondominiumAddressRepository.findOne).toBeCalledTimes(1);
    });

    it('shoule return empty when cond is not found', async () => {
      jest
        .spyOn(mockCondominiumAddressRepository, 'findOne')
        .mockResolvedValueOnce([]);
      const cond = await service.findOne(mockCondominiumStub().id);

      expect(cond).toMatchObject([]);
      expect(mockCondominiumAddressRepository.findOne).toBeCalledTimes(2);
    });
  });

  describe('When create condominion', () => {
    it('should create an condominium', async () => {
      const create = await service.create(mockCondominiumStub());

      expect(create).toMatchObject(mockCondominiumStub());
    });
  });

  describe('When update cond', () => {
    it('shoud update condi data', async () => {
      const update = await service.update(
        mockCondominiumStub().id,
        mockCondominiumStub(),
      );

      expect(update).toMatchObject(mockCondominiumStub());
    });
  });
});
