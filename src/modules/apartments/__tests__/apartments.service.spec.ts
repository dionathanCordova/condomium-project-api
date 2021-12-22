import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApartmentsRepository } from '../apartments.repository';
import { ApartmentsService } from '../apartments.service';
import { mockApartment, mockApartmentsStub } from './mockApartments';

describe('ApartmentsService', () => {
  let service: ApartmentsService;

  const mockApartmentRepository = {
    findAll: jest.fn().mockResolvedValue(mockApartmentsStub()),
    create: jest.fn().mockResolvedValue(mockApartment()),
    getOne: jest.fn(),
    findOne: jest.fn(),
    deleteApartment: jest.fn().mockResolvedValue(mockApartment()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentsService,
        {
          provide: getRepositoryToken(ApartmentsRepository),
          useValue: mockApartmentRepository,
        },
      ],
    }).compile();

    service = module.get<ApartmentsService>(ApartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When list apartments', () => {
    it('should be able to list all apartments from an condominium', async () => {
      const apartments = await service.findAll(mockApartment().condominium_id);

      expect(apartments).toMatchObject(mockApartmentsStub());
    });
  });

  describe('When create apartment', () => {
    it('should be able to create an apartment', async () => {
      mockApartmentRepository.getOne.mockResolvedValueOnce(undefined);

      const create = await service.create(mockApartment());

      expect(create).toEqual(mockApartment());
    });

    it('should throw when apartment already exists', async () => {
      mockApartmentRepository.getOne.mockResolvedValueOnce(
        mockApartmentsStub()[0],
      );

      try {
        await service.create(mockApartment());
      } catch (error) {
        expect(error.response).toEqual({
          statusCode: 406,
          message: 'Apartment already exists',
          error: 'Not Acceptable',
        });
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('When remove apartment', () => {
    it('should be able to remove an apartment', async () => {
      mockApartmentRepository.findOne.mockResolvedValueOnce(
        mockApartmentsStub()[0],
      );

      const remove = await service.remove(
        '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
      );

      expect(remove).toMatchObject(mockApartment());
    });

    it('should throw when remove an missing apartment', async () => {
      mockApartmentRepository.findOne.mockResolvedValueOnce(undefined);

      try {
        await service.remove('21a19f85-cfeb-4ad4-8474-c1aac4b88643');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Apartment not exists');
      }
    });
  });
});
