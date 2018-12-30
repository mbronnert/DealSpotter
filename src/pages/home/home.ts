import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


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
            restaurant: "VILDIA",
            type: "EUROPEAN FOOD",
            distance: 0.2,
            picture: "europeanfood.jpg",
            labels: []
        },
        {
            id: 2,
            name: "1 FREE PIZZA",
            description: "Buy two pizza and get one free",
            restaurant: "PIZZERIA TOSCANA",
            type: "PIZZERIA",
            distance: 0.3,
            picture: "pizzeria.jpg",
            labels: []
        },
        {
            id: 3,
            name: "1 FREE COFFEE",
            description: "Get a 10% off in the all restaurant",
            restaurant: "FRESHOOD",
            type: "HEALTHY FOOD",
            distance: 1.0,
            picture: "healthyfood.jpg",
            labels: []
        },
        {
            id: 4,
            name: "15% OFF",
            description: "Get a 10% off on all the pastas",
            restaurant: "STARMA",
            type: "ITALIAN FOOD",
            distance: 1.2,
            picture: "italianfood.jpg",
            labels: []
        }
    ]

    constructor(public navCtrl: NavController) {

    }

}
