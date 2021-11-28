import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondConfigRepository } from '../cond-config.repository';
import { CondConfigService } from '../cond-config.service';
import { mockCondConfig } from './mockConfig';

describe('CondConfigService', () => {
  let service: CondConfigService;

  const mockConfConfigRepository = {
    find: jest.fn().mockResolvedValue([mockCondConfig(), mockCondConfig()]),
    findOne: jest.fn().mockResolvedValue(mockCondConfig()),
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

      expect(config).toMatchObject([mockCondConfig(), mockCondConfig()]);
      expect(config.length).toBeGreaterThan(1);
      expect(mockConfConfigRepository.find).toBeCalledTimes(1);
    });

    it('should be able to find last config', async () => {
      const config = await service.findOne(mockCondConfig().condominium_id);
      expect(config).toMatchObject(mockCondConfig());
      expect(mockConfConfigRepository.find).toBeCalledTimes(1);
    });
  });
});
