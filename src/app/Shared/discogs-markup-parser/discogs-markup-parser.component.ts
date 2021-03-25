import { _isNumberValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

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
    let replacements = new  Array<{token:string, replacement:string}>();
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
          replacements.push({token: currentToken, replacement: this.getHtmlFromToken(currentToken)});
          standardTokenStart = -1;
        }
      }
    }

    let parsedValue = markup;
    for(let item of replacements)
      parsedValue = parsedValue.replace('['+ item.token + ']',item.replacement);

    parsedValue = parsedValue.replace(/\n\r?/g, '<br />');
    return parsedValue;
  }

  private getHtmlFromToken(token:string)
  {
    //dynamic components - with input - just turning out to be too much
    //ViewChildren don't populate dynamic content, all a big mess
    let tokenValue : string;
    if (token.startsWith('a'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
        return "<span style='font-style:italic'><a href='/Artists/ArtistDetail/" +tokenValue +  "'>(Artist Link)</a></span>";
      else
        return tokenValue.substring(1);
    }
    else if (token.startsWith('l'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
        return "<span style='font-style:italic'><a href='/Labels/LabelDetail/" +tokenValue +  "'>(Label Link)</a></span>";
      else
        return tokenValue.substring(1);
    }
    else if (token === "b")
      return "<b>"
    else if (token === "/b")
      return "</b>"
    else
      return "";

  }
}
