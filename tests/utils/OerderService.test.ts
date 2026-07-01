import test from 'node:test';
import assert from 'node:assert/strict';
import { OrderService, Order, OrderItem, Product, OrderRepository, CouponService } from '../../src/utils/OerderService.ts';

test('OrderService: calculateSubtotal', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const items: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 2 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 1 }
    ];
    const subtotal = orderService.calculateSubtotal(items);
    assert.strictEqual(subtotal, 400);
});

test('OrderService: calculateTax', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const tax = orderService.calculateTax(1000);
    assert.strictEqual(tax, 180);
});

test('OrderService: calculateShipping', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    assert.strictEqual(orderService.calculateShipping(500), 100);
    assert.strictEqual(orderService.calculateShipping(1000), 0);
});

test('OrderService: hasEnoughStock', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const product: Product = { id: 1, name: 'Product A', price: 100, stock: 10 };
    const item: OrderItem = { product, quantity: 5 };
    assert.strictEqual(orderService.hasEnoughStock(item), true);
    item.quantity = 15;
    assert.strictEqual(orderService.hasEnoughStock(item), false);
});

test('OrderService: getPremiumProducts', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const items: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 500, stock: 10 }, quantity: 1 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 1 }
    ];
    const premiumItems = orderService.getPremiumProducts(items, 300);
    assert.strictEqual(premiumItems.length, 1);
    assert.strictEqual(premiumItems[0].product.name, 'Product A');
});

test('OrderService: getMostExpensiveItem', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const items: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 1 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 1 }
    ];
    const mostExpensiveItem = orderService.getMostExpensiveItem(items);
    assert.strictEqual(mostExpensiveItem?.product.name, 'Product B');
});

test('OrderService: placeOrder', async () => {
    const mockRepository: OrderRepository = {
        save: async (order: Order, total: number) => {
            assert.strictEqual(order.customerId, 1);
            assert.strictEqual(total, 1162); // Adjusted expected total
            return 1; // Return order ID
        }
    };

    const mockCouponService: CouponService = {
        getDiscountPercentage: async (code: string) => {
            return code === 'DISCOUNT' ? 10 : null; // 10% discount for valid code
        }
    };

    const orderService = new OrderService(mockRepository, mockCouponService);
    const order: Order = {
        customerId: 1,
        items: [
            { product: { id: 1, name: 'Product A', price: 1000, stock: 10 }, quantity: 1 }
        ],
        couponCode: 'DISCOUNT'
    };

    const orderId = await orderService.placeOrder(order);
    assert.strictEqual(orderId, 1);
});

// Additional tests for uncovered lines
test('OrderService: calculateDiscount with no coupon', async () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const discount = await orderService.calculateDiscount(1000);
    assert.strictEqual(discount, 0);
});

test('OrderService: calculateDiscount with invalid coupon', async () => {
    const mockCouponService: CouponService = {
        getDiscountPercentage: async (code: string) => null,
    };
    const orderService = new OrderService({} as OrderRepository, mockCouponService);
    const discount = await orderService.calculateDiscount(1000, 'INVALID');
    assert.strictEqual(discount, 0);
});

test('OrderService: validateOrder with missing customerId', async () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const order: Order = {
        customerId: 0,
        items: [{ product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 1 }],
    };
    await assert.rejects(async () => {
        await orderService.placeOrder(order);
    }, { message: 'Customer is required' });
});

test('OrderService: validateOrder with empty items', async () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const order: Order = {
        customerId: 1,
        items: [],
    };
    await assert.rejects(async () => {
        await orderService.placeOrder(order);
    }, { message: 'Order is empty' });
});

test('OrderService: validateOrder with out of stock item', async () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const order: Order = {
        customerId: 1,
        items: [{ product: { id: 1, name: 'Product A', price: 100, stock: 0 }, quantity: 1 }],
    };
    await assert.rejects(async () => {
        await orderService.placeOrder(order);
    }, { message: 'Product A is out of stock' });
});

test('OrderService: validateOrder with zero quantity', async () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const order: Order = {
        customerId: 1,
        items: [{ product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 0 }],
    };
    await assert.rejects(async () => {
        await orderService.placeOrder(order);
    }, { message: 'Quantity should be greater than zero' });
});

test('OrderService: isBulkOrder', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const items: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 5 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 6 }
    ];
    assert.strictEqual(orderService.isBulkOrder(items), true);
});

test('OrderService: getTotalQuantity', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    const items: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 5 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 3 }
    ];
    const totalQuantity = orderService.getTotalQuantity(items);
    assert.strictEqual(totalQuantity, 8);
});

test('OrderService: getCustomerTier', () => {
    const orderService = new OrderService({} as OrderRepository, {} as CouponService);
    assert.strictEqual(orderService.getCustomerTier(100000), 'Platinum');
    assert.strictEqual(orderService.getCustomerTier(50000), 'Gold');
    assert.strictEqual(orderService.getCustomerTier(10000), 'Silver');
    assert.strictEqual(orderService.getCustomerTier(5000), 'Regular');
});