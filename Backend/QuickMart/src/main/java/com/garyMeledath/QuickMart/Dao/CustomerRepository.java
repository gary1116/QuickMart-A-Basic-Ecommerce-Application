package com.garyMeledath.QuickMart.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.garyMeledath.QuickMart.Entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{

	
}
