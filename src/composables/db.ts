// Using IndexedDB for the first time..🤔

import type { Word } from "./engine"

interface DbItem {
    itemId: string  
}


interface Coins extends DbItem  {
    itemId: "coins",
    coins: number,
}

interface UserAnswers extends DbItem {
    itemId: string,
    userAnswers: Word[]
}




const data = {
    size: 9,
    words: [
        { "word": "URETER", "start": [3, 0], "end": [3, 5], "meaning": "a tube that carries urine from the kidneys to the bladder" },
        { "word": "PATELLA", "start": [0, 2], "end": [6, 2], "meaning": "knee bone" },
        { "word": "FEMUR", "start": [0, 7], "end": [4, 7], "meaning": "longest bone of the body" },
        { "word": "DELTOID", "start": [5, 0], "end": [5, 6], "meaning": "the muscle of the shoulder region" },
        { "word": "CLAVICLE", "start": [1, 0], "end": [1, 7], "meaning": "collar bone" },
        { "word": "URETHRA", "start": [8, 0], "end": [8, 6], "meaning": "a tube that carries urine from the bladder outside the body" },
        { "word": "DURA", "start": [5, 6], "end": [8, 6], "meaning": "outermost layer of the spinal meninges" }
    ],
    urlId: window.location.pathname
}

const createDb = (dbName: string = "TestDatabsase", createObjectStore: (db: IDBDatabase) => void = (db) => {}) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = window.indexedDB.open(dbName, 3);
        let db: IDBDatabase;
    
        request.onerror = (e) => reject(`Why didn't you let me use IndexedDB`)

        request.onsuccess = (e: any) => {
            if (!e.target?.result) reject(`Why didn't you let me use IndexedDB`);
            
            db = e.target?.result! as any as IDBDatabase
            resolve(db)
            console.log('created')
        }


        
        request.onupgradeneeded = (e:any) => {
            if (!e.target?.result) reject(`Why didn't you let me use IndexedDB`);
            
            db = e.target?.result! as any as IDBDatabase

            createObjectStore.bind(this, db)()
            
        }
    
    
    })
}


const createObjectStore = (db:IDBDatabase) => {
    const objectStore = db.createObjectStore("names", {
        keyPath: "urlId"
    })
}




const createAppStore = (db: IDBDatabase) => {
    const objectStore = db.createObjectStore("medcross", {
        keyPath: "itemId"
    })
}




createDb("TestDatabase", createObjectStore).then(db => {

    
    const transaction = db.transaction("names", "readwrite");
    const store = transaction.objectStore("names");
    const req = store.put(data)
    req.onsuccess =(e: any) => {
        console.log('created', e.target?.result, data)
    }


    transaction.oncomplete = (e) => {
        console.log(e)
    } 



    db.transaction("names", 'readonly')
        .objectStore("names").get("/mdgerman")
        .onsuccess = (e:any) => {console.log(e.target?.result)}


        db.transaction("names", 'readonly')
        .objectStore("names").get("/crossword")
        .onsuccess = (e:any) => {console.log(e.target?.result)}



})




// d


// const 



function getDataFromDb<Type>(db: IDBDatabase, storeName: string, key: string) {
    return new Promise<Type | undefined>((resolve, reject) => {
        try {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName).get(key) as IDBRequest<Type>
            transaction.onerror = (e) => {throw Error(`something went wrong`)}
            store.onerror = (e) => {throw Error(`something went wrong`)}
            store.onsuccess = (e: any) => {resolve(e.target?.result! as any as Type)}
        }
        catch(e) {reject(e)}
    })
}



function putDataInDb(db: IDBDatabase, storeName: string, data) {
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName).put(data)
            transaction.onerror = (e) => {throw Error(`something went wrong`)}
            store.onerror = (e) => {throw Error(`something went wrong`)}
            store.onsuccess = (e: any) => {resolve(e.target?.result! as any as string)}
        }
        catch(e) {reject(e)}
    })
} 


