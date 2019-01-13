import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FiltersModal } from '../filters/filters-modal';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker,
 Environment,
 ILatLng
} from '@ionic-native/google-maps';

import { DetailPopover } from '../home/home';

@Component({
    selector: 'about',
    templateUrl: 'about.html'
})

export class AboutPage {

  dealsList = [
      {
          id: 1,
          name: "10% OFF",
          description: "Get a 10% off in the all restaurant",
          restaurantID: 1,
          restaurantName: "VILDIA",
          type: "EUROPEAN FOOD",
          distance: 0.2,
          picture: "europeanfood.jpg",
          labels: ['expensive', 'vegan', 'forStudent'],
          filters: {
              foodType: ['european'],
              maxPrice: '400',
              momentOfTheDay: ['lunch', 'dinner'],
              forStudent: true,
              dealType: ['discount'],
              servedFood: ['none', 'vegetarian', 'vegan'],
              dealMood: ['cosy', 'romantic', 'chic'],
          },
          position : {
            lat:59.403227,
            long:17.949544
          }
      },
      {
          id: 2,
          name: "1 FREE PIZZA",
          description: "Buy two pizza and get one free",
          restaurantID: 2,
          restaurantName: "PIZZERIA TOSCANA",
          type: "PIZZERIA",
          distance: 0.3,
          picture: "pizzeria.jpg",
          labels: ['medium', 'vegan'],
          filters: {
              foodType: ['pizzeria'],
              maxPrice: '200',
              momentOfTheDay: ['lunch', 'dinner'],
              forStudent: false,
              dealType: ['specialOffer'],
              servedFood: ['none', 'vegetarian', 'vegan'],
              dealMood: ['cosy'],
          },
          position : {
            lat:59.404240,
            long:17.948316
          }
      },
      {
          id: 3,
          name: "1 FREE COFFEE",
          description: "Buy a menu and get a free coffee",
          restaurantID: 3,
          restaurantName: "FRESHOOD",
          type: "HEALTHY FOOD",
          distance: 1.0,
          picture: "healthyfood.jpg",
          labels: ['cheap', 'vegan'],
          filters: {
              foodType: ['healthy'],
              maxPrice: '100',
              momentOfTheDay: ['lunch', 'dinner'],
              forStudent: false,
              dealType: ['specialOffer'],
              servedFood: ['none', 'vegetarian', 'vegan'],
              dealMood: ['cosy', 'chic'],
          },
          position : {
            lat:59.403253,
            long:17.944874
          }
      },
      {
          id: 4,
          name: "15% OFF",
          description: "Get a 15% off on all the pastas",
          restaurantID: 4,
          restaurantName: "STARMA",
          type: "ITALIAN FOOD",
          distance: 1.2,
          picture: "italianfood.jpg",
          labels: ['medium', 'vegetarian'],
          filters: {
              foodType: ['italian'],
              maxPrice: '200',
              momentOfTheDay: ['lunch', 'dinner'],
              forStudent: false,
              dealType: ['discount'],
              servedFood: ['none', 'vegetarian'],
              dealMood: ['cosy'],
          },
          position : {
            lat:59.404222,
            long:17.946201
          }
      },
      {
          id: 5,
          name: "1 FREE COFFEE",
          description: "Buy a menu and get a free coffee",
          restaurantID: 1,
          restaurantName: "VILDIA",
          type: "EUROPEAN FOOD",
          distance: 0.2,
          picture: "europeanfood.jpg",
          labels: ['expensive', 'vegan'],
          filters: {
              foodType: ['european'],
              maxPrice: '400',
              momentOfTheDay: ['lunch'],
              forStudent: false,
              dealType: ['specialOffer'],
              servedFood: ['none', 'vegetarian', 'vegan'],
              dealMood: ['cosy', 'romantic', 'chic'],
          },
          position : {
            lat:59.404869,
            long:17.943379
          }
      }
  ]

  filteredList;

  map : GoogleMap;

  filters = {
      foodType: [],
      maxPrice: 'none',
      momentOfTheDay: [],
      forStudent: true,
      dealType: [],
      foodPreference: 'none',
      dealMood: [],
      radius: 10,
  };

 constructor(private googleMaps: GoogleMaps,public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
     this.filteredList = this.dealsList
 }

// Load map only after view is initialized
ngAfterViewInit() {
 this.loadMap();
}

openFiltersModal() {
    const modal = this.modalCtrl.create(FiltersModal, { filters: this.filters });
    modal.onDidDismiss(data => {
        if (data) {
            this.filters = data;
            this.filterDeals();
            this.loadMap();
        }
   });
    modal.present();
}

filterDeals () {
    this.filteredList = this.dealsList.filter(deal => this.filters.maxPrice == 'none' || (deal.filters.maxPrice != 'none' && this.filters.maxPrice != 'none' && parseInt(deal.filters.maxPrice) <= parseInt(this.filters.maxPrice)))
            .filter(deal => deal.filters.servedFood.some(filter => filter == this.filters.foodPreference))
            .filter(deal => deal.distance <= this.filters.radius)
            .filter(deal => this.filters.foodType.length == 0 || this.filters.foodType.some(filter => deal.filters.foodType.includes(filter)))
            .filter(deal => this.filters.dealMood.length == 0 || this.filters.dealMood.every(filter => deal.filters.dealMood.includes(filter)))
            .filter(deal => this.filters.momentOfTheDay.length == 0 || this.filters.momentOfTheDay.some(filter => deal.filters.momentOfTheDay.includes(filter)))
            .filter(deal => this.filters.dealType.length == 0 || this.filters.dealType.some(filter => deal.filters.dealType.includes(filter)))
            .filter(deal => this.filters.forStudent == true || this.filters.forStudent == false && deal.filters.forStudent == false)
    ;
}


loadMap() {
  Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA_R-aWRR8i3iz3Q3qPfVXEqii_X9JIikU',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA_R-aWRR8i3iz3Q3qPfVXEqii_X9JIikU'
    });
 let element: HTMLElement = document.getElementById('map');

 if(this.map)
 {this.map.remove();}

 this.map = this.googleMaps.create(element);

 this.filteredList.forEach(deal => {
  let currentMarker : Marker = this.map.addMarkerSync({
        title: deal.name,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: deal.position.lat,
          lng: deal.position.long
        }
      });

    currentMarker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log(deal.id);
      const popover = this.popoverCtrl.create(DetailPopover, { dealID: deal.id, restaurantID: deal.restaurantID, dealsList: this.dealsList });
      popover.present();
    });
    });


    let CurrentPosition: Marker = this.map.addMarkerSync({
         title: 'Your position',
         icon: 'blue',
         animation: 'DROP',
         position: {
           lat: 59.404857,
           lng: 17.949722
         }
       });


    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
			console.log('Map is ready!')

			let position: CameraPosition <ILatLng> = {
        target: {
          lat: 59.405072,
          lng: 17.949550
        },
				zoom: 14
			}

			// // move the map's camera to position
			this.map.moveCamera(position);
		})






 }

}
