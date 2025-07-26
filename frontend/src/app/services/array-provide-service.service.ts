import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayProvideServiceService {
categoryProName : any[]=[]
categoryLocalstorage: any[]=[]
  constructor(private http : HttpClient) { }

setData(data: any){
  this.categoryProName = data;
  localStorage.setItem('categoryName' , JSON.stringify(this.categoryProName))
  console.log("get data in array" , this.categoryProName)
}
getData(): any[] {
  const categoryLocalstorage = localStorage.getItem('categoryName');
console.log("categoryLocalstorage" , categoryLocalstorage)
  // If nothing in localStorage, return an empty array
  if (!categoryLocalstorage) {
    return [];
  }

  // Parse the JSON string into an array
  return JSON.parse(categoryLocalstorage);
}

}
