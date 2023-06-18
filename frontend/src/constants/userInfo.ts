import {getAuth, onAuthStateChanged} from 'firebase/auth';

let displayName;
let photo;
const auth = getAuth();
onAuthStateChanged(auth, user => {
  if (user) {
    displayName = user.displayName;
    photo = user.photoURL;
    if (displayName == null) {
      displayName = 'welcome back';
    }
  } else {
    displayName = 'welcome back';
    photo = require('../../assets/images/user.png');
  }
});

export {displayName};
export {photo};
