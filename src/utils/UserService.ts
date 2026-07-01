// UserService.ts

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
}

export class UserService {
  constructor(private repository: UserRepository) {}

  // Pure function
  add(a: number, b: number): number {
    return a + b;
  }

  // String manipulation
  capitalize(name: string): string {
    if (!name) return "";
    return name[0].toUpperCase() + name.slice(1);
  }

  // Conditional Logic
  isAdult(age: number): boolean {
    return age >= 18;
  }

  // Array
  getAdults(users: User[]): User[] {
    return users.filter(user => user.age >= 18);
  }

  // Loop
  getTotalAge(users: User[]): number {
    let total = 0;

    for (const user of users) {
      total += user.age;
    }

    return total;
  }

  // Exception
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero");
    }

    return a / b;
  }

  // Async Method
  async getUser(id: number): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  // Async Save
  async createUser(user: User): Promise<User> {
    this.validateUser(user);
    return await this.repository.save(user);
  }

  // Async Delete
  async deleteUser(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  // Static Method
  static generateEmail(name: string): string {
    return `${name.toLowerCase()}@example.com`;
  }

  // Date dependency
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Random dependency
  generateOTP(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  // Boolean
  hasValidEmail(user: User): boolean {
    return user.email.includes("@");
  }

  // Nested Conditions
  getUserCategory(user: User): string {
    if (user.age < 18) return "Minor";

    if (user.age < 60) {
      return "Adult";
    }

    return "Senior";
  }

  // Reduce
  getAverageAge(users: User[]): number {
    if (users.length === 0) return 0;

    const total = users.reduce((sum, user) => sum + user.age, 0);

    return total / users.length;
  }

  // Private helper
  private validateUser(user: User): void {
    if (!user.name) {
      throw new Error("Name is required");
    }

    if (user.age < 0) {
      throw new Error("Invalid age");
    }

    if (!user.email.includes("@")) {
      throw new Error("Invalid email");
    }
  }
}