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

  //TODO some sort of home page - genres maybe?
  //TODO Should the show/hide only allow one open per page?
  //TODO scss cleanup/implentation
  //TODO - image gallery Maybe use this : https://openbase.com/js/@ks89/angular-modal-gallery, or this http://ivylab.space/gallery
  //TODO Dynamic HTML rendering for profiles
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
