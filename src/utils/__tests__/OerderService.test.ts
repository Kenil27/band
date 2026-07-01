// src/utils/__tests__/OerderService.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { OrderService, Order, OrderItem, Product, OrderRepository, CouponService } from '../OerderService.ts';

test('calculateSubtotal should return correct subtotal', () => {
    const orderItems: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 2 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 1 }
    ];
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    const subtotal = orderService.calculateSubtotal(orderItems);
    assert.strictEqual(subtotal, 400);
});

test('calculateTax should return correct tax amount', () => {
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    const tax = orderService.calculateTax(1000);
    assert.strictEqual(tax, 180);
});

test('calculateShipping should return correct shipping charge', () => {
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    assert.strictEqual(orderService.calculateShipping(500), 100);
    assert.strictEqual(orderService.calculateShipping(1000), 0);
});

test('hasEnoughStock should return true if stock is sufficient', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100, stock: 10 };
    const orderItem: OrderItem = { product, quantity: 5 };
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    assert.strictEqual(orderService.hasEnoughStock(orderItem), true);
});

test('getTotalQuantity should return total quantity of items', () => {
    const orderItems: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 100, stock: 10 }, quantity: 2 },
        { product: { id: 2, name: 'Product B', price: 200, stock: 5 }, quantity: 3 }
    ];
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    const totalQuantity = orderService.getTotalQuantity(orderItems);
    assert.strictEqual(totalQuantity, 5);
});

test('isEligibleForFreeGift should return true if subtotal is above threshold', () => {
    const orderItems: OrderItem[] = [
        { product: { id: 1, name: 'Product A', price: 1000, stock: 10 }, quantity: 2 }
    ];
    const order: Order = { customerId: 1, items: orderItems };
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    assert.strictEqual(orderService.isEligibleForFreeGift(order), true);
});

test('placeOrder should throw error if customerId is missing', async () => {
    const orderService = new OrderService({ save: async () => 1 }, { getDiscountPercentage: async () => 0 });
    const order: Order = { customerId: 0, items: [] };
    await assert.rejects(async () => {
        await orderService.placeOrder(order);
    }, { message: 'Customer is required' });
});