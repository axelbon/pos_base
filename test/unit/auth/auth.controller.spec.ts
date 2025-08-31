import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn().mockResolvedValue({ access_token: 'jwt_token' }),
            signin: jest.fn().mockResolvedValue({ access_token: 'jwt_token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should signup', async () => {
    expect(await controller.signup({email: 'test@example.com', password: 'pass123'})).toEqual({ access_token: 'jwt_token' });
  });

  it('should signin', async () => {
    expect(await controller.signin({ email: 'test@example.com', password: 'pass123'})).toEqual({ access_token: 'jwt_token' });
  });

});
