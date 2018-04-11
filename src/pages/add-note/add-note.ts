import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  note: Note = {
    pregunta: '',
    respuesta1: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: '',
    correcta: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  addNote(note: Note) {
    this.noteListService.addNote(note).then(ref => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
