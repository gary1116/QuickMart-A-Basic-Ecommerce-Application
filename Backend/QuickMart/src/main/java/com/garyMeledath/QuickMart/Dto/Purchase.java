package com.garyMeledath.QuickMart.Dto;

import java.util.Set;

import com.garyMeledath.QuickMart.Entity.Address;
import com.garyMeledath.QuickMart.Entity.Customer;
import com.garyMeledath.QuickMart.Entity.Order;
import com.garyMeledath.QuickMart.Entity.OrderItem;

import lombok.*;

@Data
public class Purchase {
	

	private Customer customer;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItems;
	
}
