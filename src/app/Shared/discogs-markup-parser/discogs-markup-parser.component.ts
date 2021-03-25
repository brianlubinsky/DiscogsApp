import { _isNumberValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { IArtistService } from '../../Artist/IArtistService';
import { IArtist } from '../../Artist/Models/IArtist';
import { ILabelService } from '../../Label/ILabelService';
import { ILabel } from '../../Label/Models/ILabel';

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

  artists$ : Observable<IArtist[]>;
  requestedArtistIds = new Array<number>();

  constructor(private labelService:ILabelService, private artistService:IArtistService) { }

  ngOnInit(): void {
    this.parseMarkup(true,null,null); //observables need to be set during OnInit for template to bind correctly
  }

  parseMarkup(initializing:boolean,labels:Array<ILabel>, artists:Array<IArtist>)
  {
    let tokenParseValues = new  Array<{token:string, replacement:string}>();
    let tokenStartIndex = -1;
    let currentToken:string;
    for (let index = 0; index < this.discogsMarkup.length; ++index)
    {
      if (this.discogsMarkup[index] === '[')
        tokenStartIndex = index;
      else if (tokenStartIndex >= 0)
      {
        if (this.discogsMarkup[index] === ']')
        {
          currentToken =this.discogsMarkup.substring(tokenStartIndex+1, index);
          tokenParseValues.push({token: currentToken, replacement: this.getHtmlFromToken(currentToken,labels,artists)});
          tokenStartIndex = -1;
        }
      }
    }

    let parsedValue = this.discogsMarkup;
    for(let item of tokenParseValues)
      parsedValue = parsedValue.replace('['+ item.token + ']',item.replacement);

    parsedValue = parsedValue.replace(/\n\r?/g, '<br />');

    if (initializing)
      this.initializeObservables();

    return parsedValue;
  }

  private initializeObservables() {
    var labelObservableArray = new Array<Observable<ILabel>>();
    this.requestedLabelIds.forEach(x => {
      labelObservableArray.push(this.labelService.getLabel(x));
    });
    this.labels$ = combineLatest(labelObservableArray);

    var artistObservableArray = new Array<Observable<IArtist>>();
    this.requestedArtistIds.forEach(x => {
      artistObservableArray.push(this.artistService.getArtist(x));
    });
    this.artists$ = combineLatest(artistObservableArray);
  }

  private getHtmlFromToken(token:string, labels:Array<ILabel>, artists:Array<IArtist>)
  {
    let tokenValue : string;
    let foundResult : ILabel;
    let parsedValue:string;

    if (token.startsWith('a'))
      return this.parseArtistToken(token,artists);
    else if (token.startsWith('l'))
      return this.parseLabelToken(token,labels);
    else if (token === "b")
      return "<b>"
    else if (token === "/b")
      return "</b>"
    else
      return "";
  }

  private parseLabelToken(token:string, labels:Array<ILabel>)
  {
      const tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
      {
        const foundResult = labels?.find(x=>x.id === +tokenValue );
        if (!foundResult){
          if (!this.requestedLabelIds.find(x=>x === +tokenValue))
            this.requestedLabelIds.push(+tokenValue);
          return "<span style='font-style:italic'><a href='/Labels/LabelDetail/" +tokenValue +  "'>(label link)</a></span>";
        }
        else
          return "<span><a href='/Labels/LabelDetail/" +tokenValue +  "'>" +  foundResult.name + "</a></span>";
      }
      else
        return tokenValue.substring(1);
  }

  private parseArtistToken(token:string, artists:Array<IArtist>)
  {
      const tokenValue = token.substring(1);
      if ( _isNumberValue(tokenValue) )
      {
        const foundResult = artists?.find(x=>x.id === +tokenValue );
        if (!foundResult){
          if (!this.requestedArtistIds.find(x=>x === +tokenValue))
            this.requestedArtistIds.push(+tokenValue);
          return "<span style='font-style:italic'><a href='/Artists/ArtistDetail/" +tokenValue +  "'>(artist link)</a></span>";
        }
        else
          return "<span><a href='/Artists/ArtistDetail/" +tokenValue +  "'>" +  foundResult.name + "</a></span>";
      }
      else
        return tokenValue.substring(1);
  }
}
