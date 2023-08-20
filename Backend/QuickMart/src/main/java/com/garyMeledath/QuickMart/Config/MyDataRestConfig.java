package com.garyMeledath.QuickMart.Config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

//import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.garyMeledath.QuickMart.Entity.Product;
import com.garyMeledath.QuickMart.Entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	
	
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,CorsRegistry cors) {
		
		HttpMethod[] unSupportedActions = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

//	DISABLE THESE HTTP METHODS for product\\

		config.getExposureConfiguration()
			   .forDomainType(Product.class)
			   .withItemExposure((metadata, httpMethods)-> httpMethods.disable(unSupportedActions))
			   .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(unSupportedActions));
		
		
//		DISABLE THESE HTTP METHODS for product category\\

		config.getExposureConfiguration()
		   .forDomainType(ProductCategory.class)
		   .withItemExposure((metadata, httpMethods)-> httpMethods.disable(unSupportedActions))
		   .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(unSupportedActions));
	
	
		//call an internal method 
		exposeIds(config);
	}




	private void exposeIds(RepositoryRestConfiguration config) {
	
		
//		get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		
//		create an array of the entity types
		
		List<Class> entityClasses = new ArrayList<>();
		
		
//	get the entity type for the entities
		for(EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
//		expose the entity ids for the array of entity/domain types
		
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
	}
	
}
