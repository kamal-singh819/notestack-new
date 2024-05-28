import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };
//this json file came from settings/project-settings/service-account in firebase

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;