import {createServer} from 'http';

function server() {
    let server = createServer(
        (req, res) => {
            res.write('Ale super!');
            res.end();
        }
    );

    server.listen(8080);
}

server();