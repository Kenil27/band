// OrderService.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  customerId: number;
  items: OrderItem[];
  couponCode?: string;
}

export interface OrderRepository {
  save(order: Order, total: number): Promise<number>;
}

export interface CouponService {
  getDiscountPercentage(code: string): Promise<number | null>;
}

export class OrderService {
  private readonly TAX_RATE = 0.18;
  private readonly FREE_SHIPPING_LIMIT = 1000;
  private readonly SHIPPING_CHARGE = 100;

  constructor(
    private repository: OrderRepository,
    private couponService: CouponService
  ) {}

  // Main business method
  async placeOrder(order: Order): Promise<number> {
    this.validateOrder(order);

    const subtotal = this.calculateSubtotal(order.items);

    const discount = await this.calculateDiscount(
      subtotal,
      order.couponCode
    );

    const taxableAmount = subtotal - discount;

    const tax = this.calculateTax(taxableAmount);

    const shipping = this.calculateShipping(taxableAmount);

    const finalAmount = taxableAmount + tax + shipping;

    return this.repository.save(order, finalAmount);
  }

  // Sum all item prices
  calculateSubtotal(items: OrderItem[]): number {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  // Calculate tax
  calculateTax(amount: number): number {
    return Number((amount * this.TAX_RATE).toFixed(2));
  }

  // Shipping logic
  calculateShipping(amount: number): number {
    return amount >= this.FREE_SHIPPING_LIMIT
      ? 0
      : this.SHIPPING_CHARGE;
  }

  // Coupon logic
  async calculateDiscount(
    amount: number,
    coupon?: string
  ): Promise<number> {
    if (!coupon) {
      return 0;
    }

    const percentage =
      await this.couponService.getDiscountPercentage(coupon);

    if (!percentage) {
      return 0;
    }

    return Number((amount * percentage / 100).toFixed(2));
  }

  // Inventory check
  hasEnoughStock(item: OrderItem): boolean {
    return item.quantity <= item.product.stock;
  }

  // Find expensive items
  getPremiumProducts(
    items: OrderItem[],
    minPrice: number
  ): OrderItem[] {
    return items.filter(
      item => item.product.price >= minPrice
    );
  }

  // Highest priced item
  getMostExpensiveItem(
    items: OrderItem[]
  ): OrderItem | null {
    if (items.length === 0) {
      return null;
    }

    return items.reduce((max, item) =>
      item.product.price > max.product.price
        ? item
        : max
    );
  }

  // Quantity count
  getTotalQuantity(items: OrderItem[]): number {
    let total = 0;

    for (const item of items) {
      total += item.quantity;
    }

    return total;
  }

  // Boolean helper
  isBulkOrder(items: OrderItem[]): boolean {
    return this.getTotalQuantity(items) >= 10;
  }

  // Static utility
  static generateOrderNumber(): string {
    return `ORD-${Date.now()}`;
  }

  // Date dependency
  getCurrentDate(): Date {
    return new Date();
  }

  // Random dependency
  generateTrackingNumber(): string {
    const random = Math.floor(Math.random() * 1000000);

    return `TRK-${random}`;
  }

  // Branch-heavy logic
  getCustomerTier(totalSpent: number): string {
    if (totalSpent >= 100000) {
      return "Platinum";
    }

    if (totalSpent >= 50000) {
      return "Gold";
    }

    if (totalSpent >= 10000) {
      return "Silver";
    }

    return "Regular";
  }

  // Check if order is eligible for a free gift (subtotal >= 2000)
  isEligibleForFreeGift(order: Order): boolean {
    const subtotal = this.calculateSubtotal(order.items);
    return subtotal >= 2000;
  }

  // Private validation
  private validateOrder(order: Order): void {
    if (!order.customerId) {
      throw new Error("Customer is required");
    }

    if (order.items.length === 0) {
      throw new Error("Order is empty");
    }

    for (const item of order.items) {
      if (!this.hasEnoughStock(item)) {
        throw new Error(
          `${item.product.name} is out of stock`
        );
      }

      if (item.quantity <= 0) {
        throw new Error(
          "Quantity should be greater than zero"
        );
      }
    }
  }
}