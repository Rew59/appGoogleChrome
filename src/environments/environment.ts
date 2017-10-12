// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCOK5hE15_5N4Ml9Tq-mVoJG_V4FXS7Htk",
    authDomain: "word-builder-free.firebaseapp.com",
    databaseURL: "https://word-builder-free.firebaseio.com",
    projectId: "word-builder-free",
    storageBucket: "word-builder-free.appspot.com",
    messagingSenderId: "228397567787"
  }
};
