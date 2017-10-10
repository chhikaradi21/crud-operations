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
    person = this.personConstructor();

    dataArr = [
        {
            name: 'Aditya',
            city: 'Mumbai',
            mobile: '1234567899',
            age: 10
        },
        {
            name: 'Vikas',
            city: 'Hisar',
            mobile: '2123456789',
            age: 50
        },
        {
            name: 'Rishi',
            city: 'Banglore',
            mobile: '3123456789',
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

    personConstructor() {
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
        this.person = this.personConstructor();
        this.setActionStatus(false);
    }

    addNewRecord(person, f) {
        this.person = this.personConstructor();
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
