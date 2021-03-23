export interface ISearchResult
{
  id:number;
  type:"artist"|"master"|"release"|"label";
  title : string;
  thumb : string;
  cover_image : string;
}
