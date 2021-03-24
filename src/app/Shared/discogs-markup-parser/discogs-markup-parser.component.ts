import { _isNumberValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discogs-markup-parser',
  templateUrl: './discogs-markup-parser.component.html',
  styleUrls: ['./discogs-markup-parser.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DiscogsMarkupParserComponent implements OnInit {

  @Input() discogsMarkup:string

  parsedMarkup : string;
  constructor() { }

  ngOnInit(): void {
    this.parsedMarkup = this.parseMarkup(this.discogsMarkup);
  }

  parseMarkup(markup: string)
  {

debugger;
    let replacements = new  Map<string,string>();
    let standardTokenStart = -1;
    let currentToken:string;
    for (let index = 0; index < markup.length; ++index)
    {
      if (markup[index] === '[')
        standardTokenStart = index;
      else if (standardTokenStart >= 0)
      {
        if (markup[index] === ']')
        {
          currentToken =markup.substring(standardTokenStart+1, index);
          if (!replacements.has(currentToken))
            replacements.set(currentToken, this.getHtmlFromToken(currentToken))
          standardTokenStart = -1;
        }
      }
    }

    let parsedValue = markup;
    for(let item of replacements)
      parsedValue = parsedValue.replace('['+ item[0] + ']',item[1]);

    return parsedValue;
  }

  private getHtmlFromToken(token:string)
  {
    console.log('parsing ' + token);
    let tokenValue : string;
    if (token.startsWith('a'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
        return "<a href='/Artists/ArtistDetail/" +tokenValue +  "'>(Artist Link)</a>";
      else
        return tokenValue;
    }
    else if (token.startsWith('l'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
        return "<a href='/Labels/LabelDetail/" +tokenValue +  "'>(Label Link)</a>";
      else
        return tokenValue;
    }

  }
}
