import {MongoClient} from 'mongodb'
const password = encodeURIComponent("PadSuriya007870@@");
const url =`mongodb+srv://padmanaban870:${password}@database1.jhlvhfy.mongodb.net/?retryWrites=true&w=majority&appName=Database1`

export const client = new MongoClient(url);

export const dbName = 'ExpressNode';
