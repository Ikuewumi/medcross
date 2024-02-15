import type { IDBPDatabase } from "idb";
import type { UserAnswersDb } from "./composables/db";

declare global {
    interface Window {
        idb: IDBPDatabase<UserAnswersDb>,
        getDb: () => Promise<IDBPDatabase<UserAnswersDb>>,
        getPathName: () => string;
    }
}
