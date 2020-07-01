import { DbClass } from "./database";

export async function create_db() : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const db = new DbClass();
        try {
            await db.open_with_transaction();
            await db.init();
            await db.commit_close();
            resolve();
        }
        catch (err) {
            try {
                await db.rollback_close();
                reject(err);
            }
            catch (err) {
                reject (err);
            }
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