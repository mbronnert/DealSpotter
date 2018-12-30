import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ViewController, NavParams } from 'ionic-angular';

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
            labels: []
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
            labels: []
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
            labels: []
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
            labels: []
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
            labels: []
        },
    ]

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {

    }

    viewDetails(deal) {
        const popover = this.popoverCtrl.create(DetailPopover, { dealID: deal.id, restaurantID: deal.restaurantID, dealsList: this.dealsList });
        popover.present();
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
