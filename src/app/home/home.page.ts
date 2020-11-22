import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

interface logiData {
  Name: string;
  Address: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  wishList = [];
  wishData: logiData;
  logiForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public toastController: ToastController
  ) {
    this.wishData = {} as logiData;
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your wishes have been sent.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {

    this.logiForm = this.fb.group({
      Name: ['',  [Validators.required]],
      Wish: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
    })

    this.firebaseService.read_wish().subscribe(data => {

      this.wishList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Wish: e.payload.doc.data()['Wish'],
        };
      })
      console.log(this.wishList);

    });
  }


  CreateRecord() {
    console.log(this.logiForm.value);
    this.firebaseService.create_wish(this.logiForm.value).then(resp => {
      this.logiForm.reset();
      this.presentToast();
    })
      .catch(error => {
        console.log(error);
      });
  }

/*   RemoveRecord(rowID) {
    this.firebaseService.delete_wish(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditWish = record.Wish;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Wish'] = recordRow.EditWish;
    this.firebaseService.update_wish(recordRow.id, record);
    recordRow.isEdit = false;
  } */

}
