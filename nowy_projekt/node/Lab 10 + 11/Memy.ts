import { Application } from "./Application_klasa";

(async function(){
    const app = new Application();
    await app.init(8080, './');
    app.run();
})();