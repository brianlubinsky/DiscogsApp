// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  discogs_api_base_url : "https://api.discogs.com",
  discogs_api_token:"zwLdKzvRQOrHOSuteUJwHRnkzjLymhtNhCzcqpcH",
  autocompleteEnabled:true,
  pageSize:40,
  enableDebugMessages:true //TODO implement in logger

  //TODO scss cleanup/implentation
  //TODO - image gallery Maybe use this : https://openbase.com/js/@ks89/angular-modal-gallery, or this http://ivylab.space/gallery
  //TODO Dynamic HTML rendering for profiles
  //TODO album details page
  //TODO List of albums for artists and labels
  //Album search - this is probably about the best I can do. URL encode the name
  //Update the README with explanations
//https://api.discogs.com/database/search?artist=fugazi&token=zwLdKzvRQOrHOSuteUJwHRnkzjLymhtNhCzcqpcH&type=master&per_page=500&format=Album|Compilation|EP
//https://api.discogs.com/database/search?artist=The%20Rolling%20Stones&token=zwLdKzvRQOrHOSuteUJwHRnkzjLymhtNhCzcqpcH&type=master&per_page=100&page=4&format=Album|Compilation|EP
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
