import { JwtAuthMiddleware } from './jwt-auth.middleware';

describe('JwtAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtAuthMiddleware()).toBeDefined();
  });
});
