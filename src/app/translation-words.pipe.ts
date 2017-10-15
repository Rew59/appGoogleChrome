import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translationWords'
})
export class TranslationWordsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log(value);
    if([value].length > 0){
      let arrTranslWord:Array<Object>=[];
      for(let a in value){
        if(value[a].translationWord){
          //console.log(value[a]);
          arrTranslWord.push({"translationWord":value[a].translationWord,"key":a});
        }
        
        }
        //console.log(arrTranslWord);
      return arrTranslWord;
    }
  }

}
