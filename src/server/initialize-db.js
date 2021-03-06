import { defaultState } from './defaultState';
import { connectDb } from './connect-db';

async function initializeDb() {
    let db = await connectDb();

    let user = await db.collection(`users`).findOne({id: "U1"});
    if (user) {
        return;
    }

    for (let collectionName in defaultState) {
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
    }
}

initializeDb();