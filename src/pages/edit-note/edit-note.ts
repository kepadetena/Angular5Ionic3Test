import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {

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
    this.note = this.navParams.get('note');
  }

  updateNote(note: Note) {
    this.noteListService.updateNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  removeNote(note: Note) {
    this.noteListService.removeNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}
