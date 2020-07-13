import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CitiesService } from "../../services/cities.service";

/**
 * Cities page, where we render a table with all our cities.
 * Renders as well a filter input and a pagination component.
 */

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  providers: [ CitiesService ]
})
export class CitiesComponent implements OnInit {
  // PageEvent will be used to store the pagination event that will be sent to the cities service.
  pageEvent: PageEvent;

  // Custom pagination data that will be used to handle the change of page and the size of it.
  pageIndex:number;
  pageSize:number;
  length:number;

  // Main data source for cities data storage.
  dataSource: MatTableDataSource<CityData>;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.getData(null);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getData(event?:PageEvent){
    // Using observables to subscribe to the data arrival
    this.citiesService.getCities(event || { pageIndex: 0, pageSize: 10}).subscribe(
      response =>{
        if(response.error) {
          // handle error
        } else {
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(response.content);

          // Hold the paging data into these properties so we can handle paging in a customized way
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.length = response.totalElements;
        }
      },
      error =>{
        // handle error
      }
    );
    return event;
  }

}

export interface CityData {
  id: string;
  name: string;
}