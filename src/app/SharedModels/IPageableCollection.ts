import {  IPagingData } from "./IPagingData";
export interface IPageableCollection<T>
{
  pagination:IPagingData;
  results : Array<T>
}
