import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    selectedField = 'name';
    isUpdate = false;
    CONSTANTS = {
        mobile: 'mobile'
    };
    person = this.initPerson();

    dataArr = [
        {
            name: 'Aditya',
            city: 'Mumbai',
            mobile: '8879350743',
            age: 10
        },
        {
            name: 'Vikas',
            city: 'Hisar',
            mobile: '8879350748',
            age: 50
        },
        {
            name: 'Rishi',
            city: 'Banglore',
            mobile: '8879350758',
            age: 30
        }
    ];

    clone(obj) {
        let  attr;
        let copy;
        if (null == obj || 'object' !== typeof obj) {
            return obj;
        }
        copy = obj.constructor();
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }

    initPerson() {
        return {
            name: '',
            city: '',
            mobile: '',
            age: null
        }
    }

    setActionStatus(status) {
        this.isUpdate = status;
    }

    isDupclicateRecord(key, obj, arr) {
        let i;
        for (i = 0; i < arr.length; i += 1) {
            if (arr[i][key] === obj[key]) {
                return true;
            }
        }
        return false;
    }

    showModalForAdd(person) {
        this.person = this.initPerson();
        this.setActionStatus(false);
    }

    addNewRecord(person, f) {
        this.person = this.initPerson();
        // practically this check should be on server
        if (!this.isDupclicateRecord(this.CONSTANTS.mobile, person, this.dataArr)) {
            f.resetForm();
            this.dataArr.push(person);
        } else {
            alert('Duplicate record found. Mobile is unique key');
        }
    }

    editRecord(person) {
        this.setActionStatus(true);
        this.person = this.clone(person);
    }

    updateRecord(person) {
        let i;
        for (i = 0; i < this.dataArr.length; i += 1) {
            if (this.dataArr[i][this.CONSTANTS.mobile] === person[this.CONSTANTS.mobile]) {
                this.dataArr[i] = person;
            }
        }
    }

    removeRecord(person) {
        this.dataArr.splice(this.dataArr.indexOf(person), 1);
    }

}
