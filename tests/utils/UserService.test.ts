import test from 'node:test';
import assert from 'node:assert/strict';
import { UserService, User } from '../../src/utils/UserService.ts';

class MockUserRepository {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

test('UserService.add should return the sum of two numbers', () => {
  const userService = new UserService(new MockUserRepository());
  const result = userService.add(2, 3);
  assert.strictEqual(result, 5);
});

test('UserService.capitalize should capitalize the first letter of a name', () => {
  const userService = new UserService(new MockUserRepository());
  const result = userService.capitalize('john');
  assert.strictEqual(result, 'John');
});

test('UserService.isAdult should return true for age 18 and above', () => {
  const userService = new UserService(new MockUserRepository());
  assert.strictEqual(userService.isAdult(18), true);
  assert.strictEqual(userService.isAdult(17), false);
});

test('UserService.getAdults should return only adult users', async () => {
  const mockRepo = new MockUserRepository();
  const userService = new UserService(mockRepo);
  
  await mockRepo.save({ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' });
  await mockRepo.save({ id: 2, name: 'Bob', age: 17, email: 'bob@example.com' });
  
  const adults = userService.getAdults(await mockRepo.findById(1) ? [await mockRepo.findById(1)] : []);
  assert.strictEqual(adults.length, 1);
  assert.strictEqual(adults[0].name, 'Alice');
});

test('UserService.getTotalAge should return the total age of users', async () => {
  const mockRepo = new MockUserRepository();
  const userService = new UserService(mockRepo);
  
  await mockRepo.save({ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' });
  await mockRepo.save({ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' });
  
  const totalAge = userService.getTotalAge(await mockRepo.findById(1) ? [await mockRepo.findById(1), await mockRepo.findById(2)] : []);
  assert.strictEqual(totalAge, 55);
});

test('UserService.hasValidEmail should return true for valid email', () => {
  const userService = new UserService(new MockUserRepository());
  const user: User = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' };
  assert.strictEqual(userService.hasValidEmail(user), true);
});

test('UserService.getUserCategory should return correct category for user', () => {
  const userService = new UserService(new MockUserRepository());
  const user: User = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' };
  assert.strictEqual(userService.getUserCategory(user), 'Adult');
});