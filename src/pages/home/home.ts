import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FiltersModal } from '../filters/filters-modal';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

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
            }
        }
    ]

    filteredList;

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

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
        this.filteredList = this.dealsList
    }

    viewDetails(deal) {
        const popover = this.popoverCtrl.create(DetailPopover, { dealID: deal.id, restaurantID: deal.restaurantID, dealsList: this.dealsList });
        popover.present();
    }

    openFiltersModal() {
        const modal = this.modalCtrl.create(FiltersModal, { filters: this.filters });
        modal.onDidDismiss(data => {
            if (data) {
                this.filters = data;
                this.filterDeals();
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


}

@Component({
    selector: 'detail-popover',
    templateUrl: 'detail-popover.html'
})
export class DetailPopover {

    restaurantList = [
        {
            restaurantID: 1,
            restaurantName: "VILDIA",
            restaurantDescription: "to be written",
            environment: "Cosy, Romantic"
        },
        {
            restaurantID: 2,
            restaurantName: "PIZZERIA TOSCANA",
            restaurantDescription: "Pizerria Toscana is the ultimate Italian experience for friends and family to share pizzas.",
            environment: "Cosy, Familiar"
        },
        {
            restaurantID: 3,
            restaurantName: "FRESHOOD",
            restaurantDescription: "to be written",
            environment: "Cosy"
        },
        {
            restaurantID: 4,
            restaurantName: "STARMA",
            restaurantDescription: "to be written",
            environment: "Familiar, Romantic"
        },
    ];

    dealsList;
    restaurant;

    constructor(public viewCtrl: ViewController, params: NavParams) {
        this.restaurant = this.getRestaurant(params.get('restaurantID'));
        this.dealsList = params.get('dealsList').filter(deal => deal.restaurantID == this.restaurant.restaurantID);
    }

    getRestaurant(restaurantID) {
        return this.restaurantList.find((restaurant) => {
            return restaurantID == restaurant.restaurantID;
        })
    }

    getDeals(restaurantID) {
        return this.dealsList;
    }

    openGoogleMaps() {
        //TODO: redirect to Google Maps
    }

    dismiss() {
    this.viewCtrl.dismiss();
  }
}
