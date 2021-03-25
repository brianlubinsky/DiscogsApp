import { _isNumberValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { ILabelService } from '../../Label/ILabelService';
import { ILabel } from '../../Label/Models/ILabel';
import { ISearchResult } from '../../Search/ISearchResult';
import { ISearchService } from '../../Search/ISearchService';

@Component({
  selector: 'app-discogs-markup-parser',
  templateUrl: './discogs-markup-parser.component.html',
  styleUrls: ['./discogs-markup-parser.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DiscogsMarkupParserComponent implements OnInit{

  @Input() discogsMarkup:string
  parsedMarkup : string;

  labels$ : Observable<ILabel[]>;
  requestedLabelIds = new Array<number>();

  constructor(private searchService:ILabelService) { }

  ngOnInit(): void {
    this.parseMarkup(true,null);
  }

  parseMarkup(initializing:boolean,labels:Array<ILabel>)
  {
    //TODO Artists. Also should alter service to skip error handling for the extra calls.
    //
    //http://localhost:4200/Labels/LabelDetail/613604 has an artist link
    let replacements = new  Array<{token:string, replacement:string}>();
    let standardTokenStart = -1;
    let currentToken:string;
    for (let index = 0; index < this.discogsMarkup.length; ++index)
    {
      if (this.discogsMarkup[index] === '[')
        standardTokenStart = index;
      else if (standardTokenStart >= 0)
      {
        if (this.discogsMarkup[index] === ']')
        {
          currentToken =this.discogsMarkup.substring(standardTokenStart+1, index);
          replacements.push({token: currentToken, replacement: this.getHtmlFromToken(currentToken,labels)});
          standardTokenStart = -1;
        }
      }
    }

    let parsedValue = this.discogsMarkup;
    for(let item of replacements)
      parsedValue = parsedValue.replace('['+ item.token + ']',item.replacement);

    parsedValue = parsedValue.replace(/\n\r?/g, '<br />');

    if (initializing)
    {
      var labelObservableArray = new Array<Observable<ILabel>>();
      this.requestedLabelIds.forEach(x=>{
        labelObservableArray.push(this.searchService.getLabel(x));
      });
      this.labels$ = combineLatest(labelObservableArray);
    }

    return parsedValue;
  }

  private getHtmlFromToken(token:string, labels:Array<ILabel>)
  {
    let tokenValue : string;
    let foundResult : ILabel;

    if (token.startsWith('a'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
      {

        return "<span style='font-style:italic'><a href='/Artists/ArtistDetail/" + tokenValue +  "'>(Artist Link)</a></span>";
      }
      else
        return tokenValue.substring(1);
    }
    else if (token.startsWith('l'))
    {
      tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
      {
        foundResult = labels?.find(x=>x.id === +tokenValue );
        if (!foundResult){
          if (!this.requestedLabelIds.find(x=>x === +tokenValue))
            this.requestedLabelIds.push(+tokenValue);
          return "<span style='font-style:italic'><a href='/Labels/LabelDetail/" +tokenValue +  "'>(label link)</a></span>";
        }
        else
        {

          return "<span><a href='/Labels/LabelDetail/" +tokenValue +  "'>" +  foundResult.name + "</a></span>";
        }
      }
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
