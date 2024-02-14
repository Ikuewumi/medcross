import { openDB, type DBSchema } from "idb";
import type { Word } from "./engine";

interface DbWord {
    urlId: string,
    words: Word[]
}

export interface Completed {
    key: "completed",
    value: {
        id: "completed",
        crosswords: string[]
    }
}
export interface Bookmarked {
    key: "bookmarked",
    value: {
        id: "bookmarked",
        crosswords: string[]
    }
}

export interface Coins {
    key: "coins",
    value: {
        id: "coins"
        coinNumber: number
    }
        
}

export interface CurrentCrossWord {
    key: "current",
    value: {
        id: "current",
        crossword?: {
            urlId: string,
            title:  string
        }
    }
    
}


type Settings = Bookmarked | Coins | Completed | CurrentCrossWord


export interface UserAnswersDb extends DBSchema {
    userAnswers: {
        value: DbWord,
        key: string,
    };


    settings: Settings
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
