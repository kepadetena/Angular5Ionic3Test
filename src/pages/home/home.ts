import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import { CookieService } from 'ngx-cookie-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cont=0;
  cont2=1;
  
  finalizar=false;
  numcorrectas=0;

  pregunta='';
  respuesta='';

  actual=this.cookieService.get('actual');

  correctas=this.cookieService.get('numcorrectas');
 

  noteList: Observable<Note[]>
  
  constructor(public navCtrl: NavController, private noteListService: NoteListService, private cookieService: CookieService) {
    this.noteList = this.noteListService.getNoteList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  };


  ngOnInit(): void {
    
    if (this.actual!='') {
      this.cont= parseInt(this.actual)
      this.cont2=this.cont+1
      this.numcorrectas=parseInt(this.correctas)
    }
  }

  mcqAnswer(questionID,answer){
    this.pregunta=questionID;
    this.respuesta=answer;
    };
  enviar(correcta){
    
    
    

    if(correcta==this.respuesta){
      this.numcorrectas++;
      this.cookieService.set( 'numcorrectas', this.numcorrectas.toString() );
    }

    if (this.cont2<10) {
      this.cont++;
      this.cont2++;
      this.cookieService.set( 'actual', this.cont.toString() );
    } else {
      this.finalizar=true;
      console.log("preguntas correctas"+this.numcorrectas);
      this.cookieService.delete( 'numcorrectas');
      this.cookieService.delete( 'actual');
      
    }
    
    }
}
