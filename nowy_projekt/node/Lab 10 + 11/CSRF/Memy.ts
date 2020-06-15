import { Application } from "./Application_klasa";

(function(){
    const app = new Application(8080, './');
    app.run();
})();