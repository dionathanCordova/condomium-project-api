import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondConfigRepository } from '../cond-config.repository';
import { CondConfigService } from '../cond-config.service';
import { mockCondConfig, mockConfigOutput } from './mockConfig';

describe('CondConfigService', () => {
  let service: CondConfigService;

  const mockConfConfigRepository = {
    find: jest.fn().mockResolvedValue([mockConfigOutput(), mockConfigOutput()]),
    findOne: jest.fn().mockResolvedValue(mockConfigOutput()),
    createConfig: jest.fn().mockResolvedValue(mockConfigOutput()),
    updateConfig: jest.fn().mockResolvedValue(mockConfigOutput()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CondConfigService,
        {
          provide: getRepositoryToken(CondConfigRepository),
          useValue: mockConfConfigRepository,
        },
      ],
    }).compile();

    service = module.get<CondConfigService>(CondConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When list config', () => {
    it('should be able to find all configs', async () => {
      const config = await service.findAll(mockCondConfig().condominium_id);

      expect(config).toMatchObject([mockConfigOutput(), mockConfigOutput()]);
      expect(config.length).toBeGreaterThan(1);
      expect(mockConfConfigRepository.find).toBeCalledTimes(1);
    });

    it('should be able to find last config', async () => {
      const config = await service.findOne(mockCondConfig().condominium_id);
      expect(config).toMatchObject(mockConfigOutput());
      expect(mockConfConfigRepository.find).toBeCalledTimes(1);
    });
  });

  describe('When create cond config', () => {
    it('should be able to create an config', async () => {
      const create = await service.createConfig(mockCondConfig());

      expect(create).toMatchObject(mockConfigOutput());
      expect(mockConfConfigRepository.createConfig).toBeCalledTimes(1);
    });

    it('should not create config when was an existence by year', async () => {
      jest
        .spyOn(mockConfConfigRepository, 'createConfig')
        .mockResolvedValueOnce({});

      const create = await service.createConfig(mockCondConfig());
      expect(create).toMatchObject({});
    });

    it('should not create config when was not found condominium id', async () => {
      jest
        .spyOn(mockConfConfigRepository, 'createConfig')
        .mockRejectedValueOnce(new NotFoundException('Condominium not found!'));

      try {
        await service.createConfig(mockCondConfig());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Condominium not found!');
      }
    });
  });

  describe('When update config', () => {
    it('should update an config', async () => {
      const id = '09982e30-1e9b-4ba6-b065-88441deb0900';
      const update = await service.update(id, mockCondConfig());

      expect(update).toMatchObject(mockConfigOutput());
    });

    it('should throw an error when config id is not found', async () => {
      jest
        .spyOn(mockConfConfigRepository, 'updateConfig')
        .mockRejectedValueOnce(new NotFoundException());

      try {
        const id = '09982e30-1e9b-4ba6-b065-88441deb0900';
        await service.update(id, mockCondConfig());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
