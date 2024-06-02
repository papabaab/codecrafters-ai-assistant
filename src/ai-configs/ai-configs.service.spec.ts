import { Test, TestingModule } from '@nestjs/testing';
import { AiConfigsService } from './ai-configs.service';

describe('AiConfigsService', () => {
  let service: AiConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiConfigsService],
    }).compile();

    service = module.get<AiConfigsService>(AiConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
