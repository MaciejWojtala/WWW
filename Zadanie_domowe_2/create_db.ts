import { DbClass } from "./database";

export async function create_db() : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const db = new DbClass();
        try {
            await db.open();
            await db.init();
            await db.close();
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

(async function() {
    try {
        await create_db();
    }
    catch (err) {
        console.log(err);
    }
})();