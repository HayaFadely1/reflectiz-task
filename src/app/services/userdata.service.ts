import { Injectable } from '@angular/core';
import { Dictionary, FORMINFO_STARTING_DATA } from '../data';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private HOBBIES_LIST: string[] = [
    'Swimming',
    'Photography',
    'Reading',
    'Camping',
    'Hiking',
    'Football',
  ];

  private hobbiesCountMaleDict: Dictionary = {
    Swimming: 0,
    Photography: 0,
    Reading: 0,
    Camping: 0,
    Hiking: 0,
    Football: 0,
  };

  private hobbiesCountFemaleDict: Dictionary = {
    Swimming: 0,
    Photography: 0,
    Reading: 0,
    Camping: 0,
    Hiking: 0,
    Football: 0,
  };

  private arrayOfInfo: any[];
  private attemptCounter: number;
  private successCounter: number;

  constructor() {
    this.arrayOfInfo = [];
    this.attemptCounter = this.getAttemptCount();
    this.successCounter = this.getSuccessCount();
    this.hobbiesCountMaleDict = this.getHobbiesCountDict('male');
    this.hobbiesCountFemaleDict = this.getHobbiesCountDict('female');
    this.loadFirstData();
  }

  saveForm(
    formData: object,
    emailInput: string,
    gender: string,
    hobbies: any[]
  ): string {
    let msg: string = '';
    const info = localStorage.getItem('formInfo');
    if (info) {
      this.arrayOfInfo = JSON.parse(info);
      //check if email already exists
      if (!this.validateEmailDatabase(emailInput)) {
        msg = 'Email already exists!!';
        return msg;
      }
      this.arrayOfInfo = [...JSON.parse(info), formData]; //add form data to the array of users
    } else {
      this.arrayOfInfo.push(formData);
    }
    this.incrementAndSaveSuccessCounter();
    this.addHobbiesCounter(gender, hobbies); //add counter for hobbies by gender
    localStorage.setItem('formInfo', JSON.stringify(this.arrayOfInfo));
    msg = 'success';
    return msg;
  }

  private validateEmailDatabase(email: string): boolean {
    for (let i = 0; i < this.arrayOfInfo.length; i++) {
      if (this.arrayOfInfo[i].email === email) {
        return false; // NOT valid (email already exists)
      }
    }
    return true; //valid
  }

  loadFirstData() {
    const data=localStorage.getItem('formInfo')
    if(!data){
      FORMINFO_STARTING_DATA.map((obj) => {
        this.incrementAndSaveAttemptCounter();
        this.saveForm(obj, obj.email, obj.gender, obj.hobbies);
      });
    }
  }

  getAllData() {
    const info = localStorage.getItem('formInfo');
    if (info) {
      this.arrayOfInfo = JSON.parse(info);
    }
    return this.arrayOfInfo;
  }

  incrementAndSaveAttemptCounter() {
    const attemptCounter = localStorage.getItem('attemptCounter');
    if (attemptCounter) {
      this.attemptCounter = parseInt(JSON.parse(attemptCounter));
      this.attemptCounter += 1;
    } else {
      this.attemptCounter = 1;
    }
    localStorage.setItem('attemptCounter', JSON.stringify(this.attemptCounter));
  }

  incrementAndSaveSuccessCounter() {
    const successCounter = localStorage.getItem('successCounter');
    if (successCounter) {
      this.successCounter = parseInt(JSON.parse(successCounter));
      this.successCounter += 1;
    } else {
      this.successCounter = 1;
    }
    localStorage.setItem('successCounter', JSON.stringify(this.successCounter));
  }

  getAttemptCount() {
    const attemptCounter = localStorage.getItem('attemptCounter');
    if (attemptCounter) {
      return parseInt(attemptCounter);
    } else {
      return 0;
    }
  }

  getSuccessCount() {
    const successCounter = localStorage.getItem('successCounter');
    if (successCounter) {
      return parseInt(successCounter);
    } else {
      return 0;
    }
  }

  //hobbies counter functions for Radar chart component
  addHobbiesCounter(gender: string, hobbies: any[]) {
    hobbies.map((hobby) => {
      if (gender === 'male') {
        this.hobbiesCountMaleDict[hobby] += 1;
      } else {
        this.hobbiesCountFemaleDict[hobby] += 1;
      }
    });
    this.setHobbiesCountDict(gender);
  }

  getHobbiesCountDict(gender: string): Dictionary {
    const hobbiesCount = localStorage.getItem('hobbiesCount' + gender);

    if (gender === 'male') {
      if (hobbiesCount) {
        this.hobbiesCountMaleDict = JSON.parse(hobbiesCount);
      }
      return this.hobbiesCountMaleDict;
    } else {
      if (hobbiesCount) {
        this.hobbiesCountFemaleDict = JSON.parse(hobbiesCount);
      }
      return this.hobbiesCountFemaleDict;
    }
  }

  setHobbiesCountDict(gender: string) {
    if (gender === 'male') {
      localStorage.setItem(
        'hobbiesCountmale',
        JSON.stringify(this.hobbiesCountMaleDict)
      );
    } else {
      localStorage.setItem(
        'hobbiesCountfemale',
        JSON.stringify(this.hobbiesCountFemaleDict)
      );
    }
  }

  getHobbiesList() {
    return this.HOBBIES_LIST;
  }
}
