package com.garyMeledath.QuickMart.service;

import com.garyMeledath.QuickMart.Dto.Purchase;
import com.garyMeledath.QuickMart.Dto.PurchaseResponse;

public interface CheckoutService {
PurchaseResponse placeOrder(Purchase purchase);
	
}
