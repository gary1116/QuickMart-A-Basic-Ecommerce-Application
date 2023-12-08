package com.garyMeledath.QuickMart.service;

import com.garyMeledath.QuickMart.Dto.PaymentInfo;
import com.garyMeledath.QuickMart.Dto.Purchase;
import com.garyMeledath.QuickMart.Dto.PurchaseResponse;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;

public interface CheckoutService {
PurchaseResponse placeOrder(Purchase purchase);

PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
	
}
