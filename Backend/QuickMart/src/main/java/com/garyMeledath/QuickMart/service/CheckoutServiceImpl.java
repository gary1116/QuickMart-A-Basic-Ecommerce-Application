package com.garyMeledath.QuickMart.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.garyMeledath.QuickMart.Dao.CustomerRepository;
import com.garyMeledath.QuickMart.Dto.Purchase;
import com.garyMeledath.QuickMart.Dto.PurchaseResponse;
import com.garyMeledath.QuickMart.Entity.Customer;
import com.garyMeledath.QuickMart.Entity.OrderItem;
import com.garyMeledath.QuickMart.Entity.Order;


import jakarta.transaction.Transactional;


@Service
public class CheckoutServiceImpl implements CheckoutService{

	private CustomerRepository customerRepository;
	
	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
//		retrieve the order info from dto
		Order order = (Order) purchase.getOrder();
		
//		generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		 order.setOrderTrackingNumber(orderTrackingNumber);

		//		populate order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item-> order.add(item));

		
		//		populate order with billingAddress and shippingAddress
		 order.setBillingAddress(purchase.getBillingAddress());
		 order.setShippingAddress(purchase.getShippingAddress());

		
		//		populate customer with order
		Customer customer = purchase.getCustomer();
		customer.add(order);
		
		
//		save to the database	
		customerRepository.save(customer);
		
//		return a response
		return new PurchaseResponse(orderTrackingNumber);
		
		
	}
	private String generateOrderTrackingNumber() {
//		generate a random UUID number (UUID version-4)
		
		return UUID.randomUUID().toString();
	}

}

















