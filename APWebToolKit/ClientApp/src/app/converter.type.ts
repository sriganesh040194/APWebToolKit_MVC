import { forEach } from "@angular/router/src/utils/collection";

export class BooleanToYesNoStringConverter {
  public static get(value: boolean): string {
    if (value)
      return "Yes";
    else {
      return "No";
    }
  }
}

export class ChartsConverter {
  public static get(value: string, columnName: string[]) {
    
     var index=0;
    //Seperate the string by new line
    var newlineSeparatedString = value.split('\n');
    newlineSeparatedString.forEach((lineValue) => {
      var tabSeparatedString = lineValue.split('\t');
      columnName.forEach((column) => {
        index = tabSeparatedString.indexOf(column);
        //while()
      })
      
    })
  }
}
