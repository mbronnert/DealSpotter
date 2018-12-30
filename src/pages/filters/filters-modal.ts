import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'filters-modal',
    templateUrl: 'filters-modal.html'
})
export class FiltersModal {

    filters = {
        foodType: [] ,
        maxPrice: 'none',
        momentOfTheDay: [],
        dealType: [],
        foodPreference: 'none',
        dealMood: [],
        radius: 10,
    };

    constructor(public viewCtrl: ViewController, params: NavParams) {
        this.filters = params.get('filters');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    validateFilters() {
        this.viewCtrl.dismiss(this.filters);
    }

    restartFilters() {
        this.filters = {
            foodType: [] ,
            maxPrice: 'none',
            momentOfTheDay: [],
            dealType: [],
            foodPreference: 'none',
            dealMood: [],
            radius: 10,
        };
    }
}
