// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"https://nodeapi-staging.jagota.com",
  firebase: {
    apiKey: "AIzaSyAinB4UICSHP1ceeCAmGyL7rxatUGc7s_s",
    authDomain: "ejagotalogisticdev.firebaseapp.com",
    databaseURL: "https://ejagotalogisticdev-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ejagotalogisticdev",
    storageBucket: "ejagotalogisticdev.appspot.com",
    messagingSenderId: "152903765663",
    appId: "1:152903765663:web:371d5b691b674e607b5caa"
  },
  firebaseLiveLocation: {
    apiKey: "AIzaSyBiT2Zg7yL3L10IDfVTkpZAPot1U0Iwf-U",
    authDomain: "jagota-dev-live-location.firebaseapp.com",
    databaseURL: "https://jagota-dev-live-location-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jagota-dev-live-location",
    storageBucket: "jagota-dev-live-location.appspot.com",
    messagingSenderId: "519002833027",
    appId: "1:519002833027:web:bb2b3216ddaf32883f1bb6"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
