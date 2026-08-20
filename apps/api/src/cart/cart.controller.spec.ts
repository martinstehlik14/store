import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AuthGuard } from '../auth/auth.guard';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test-secret' })],
      controllers: [CartController],
      providers: [
        { provide: CartService, useValue: { getCart: jest.fn(), addItem: jest.fn(), updateItem: jest.fn(), removeItem: jest.fn() } },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});