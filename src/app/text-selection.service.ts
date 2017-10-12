import { Injectable } from '@angular/core';

@Injectable()
export class TextSelectionService {

  textSelection:String = '';

  constructor() { }

  get_text() {

    let th = this;
    document.onclick = function(ev) {
      /*let event = ev || window.event 
      //Отмена стандартных событий клика
      if (event.preventDefault) {
          // Вариант стандарта W3C: 
          event.preventDefault()
      } else {
          // Вариант Internet Explorer:
          event.returnValue = false
      }*/

      //объявление переменной
    let text = th.textSelection;
    
    if(window.getSelection) {
        //современный способ
        th.textSelection=window.getSelection().toString().trim();
    } /*else if (document.getSelection) {
    //старый способ
        text=document.getSelection();
    } else if(document.selection) {
        //IE
        text=document.selection.createRange().text;
    }*/

    //вывод результата, если получен выделенный текст
    //if(text){alert(text)};
    
    }

    
  }

  stopText(){
    let th = this;
    document.onclick = function(ev) {
      /*let event = ev || window.event 
      //Отмена стандартных событий клика
      if (event.preventDefault) {
          // Вариант стандарта W3C: 
          event.preventDefault()
      } else {
          // Вариант Internet Explorer:
          event.returnValue = false
      }*/
      th.textSelection = '';
    }
    //this.textSelection = '';
    //console.log('Стоп');
  }

}
