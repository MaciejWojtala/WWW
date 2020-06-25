import { Application } from "./Application_klasa";

(async function() {
    try {
        const app = new Application();
        await app.init(8080, './');
        app.run();
    }
    catch (err) {
        console.log(err);
    }
})();