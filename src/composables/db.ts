import { openDB, type DBSchema } from "idb";
import type { Word } from "./engine";


interface UserAnswersDb extends DBSchema {
    userAnswers: {
        value: Word[],
        key: string,
    };


    settings: {
        key: 'coins' | 'bookmarks' | 'completed',
        value: number | string[] 
    }
}


export const getDb = async () => {
    const db = await openDB<UserAnswersDb>('Medcross', 1, {
        upgrade(db) {
            const coinStore = db.createObjectStore('userAnswers', {
                keyPath: 'urlId',
                autoIncrement: false
            })


            const settingsStore = db.createObjectStore('settings', {
                keyPath: 'id'
            })
        },
    })

    return db
}