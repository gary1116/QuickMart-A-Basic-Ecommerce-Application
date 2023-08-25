import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number=1;
  searchMode: boolean = false;


  // new properties for pagination

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

previousKeyword: string = "";

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

if(this.previousKeyword != theKeyword){
  this.thePageNumber=1;
}

this.previousKeyword = theKeyword;
console.log(`keyword = ${theKeyword}, the page number = ${this.thePageNumber}`);

    // search for products using that given keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    // check if "id" param is available
    const hasId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not available..default to category id 1
      this.currentCategoryId = 1;
    }

    // 
    // check if we hae a different category than the previous
    // Note: Angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous
    // then we want to reset thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.currentCategoryId;
    
    console.log(`current categiry id = ${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string){
this.thePageSize= +pageSize;
this.thePageNumber=1;
this.listProducts();
  }

  processResult(){
    return(data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }

}






