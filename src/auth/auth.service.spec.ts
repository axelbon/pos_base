import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('jwt_token'),
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup a user', async() => {
    const dto = { email: 'test@example.com', password: 'password123' };
    const result =  await service.signup(dto);
    expect(result.access_token).toBe('jwt_token');
  });

  it('should signin user', async() => {
    const dto = {email: 'test2@example.com', password: 'password123'};
    await service.signup(dto);
    const result = await service.signin(dto);
    expect(result.access_token).toBe('jwt_token');
  });

  it('should not signup duplicate user', async() => {
    const dto = { email: 'dup@example.com', password: 'password123' };
    await service.signup(dto);
    await expect(service.signup(dto)).rejects.toThrow();
  });

  it('should not signin with wrong password', async () => {
    const dto = { email: 'fail@example.com', password: 'password123'};
    await service.signup(dto);
    await expect(service.signin({email: dto.email, password: 'wrong'})).rejects.toThrow();
  })

});
