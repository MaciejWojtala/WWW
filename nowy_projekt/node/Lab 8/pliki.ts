import * as fs from 'fs';
import {promisify} from 'util';

function files1() {
    fs.open('plik.txt', 'a', (err, fd) => {
        if (err) {
            console.log('Nie udało się otworzyć pliku :(', err);
            return;
        }
        fs.write(fd, 'Kolejny wpis do pliku!\n', (err, written,str) => {
            if (err) {
                console.log('Nie udało się zapisać', err);
            }
            fs.close(fd, () => {});
        });
    });
}

function files2() {
    let open = promisify(fs.open);
    let write = promisify(fs.write);
    let close = promisify(fs.close);
    let fd;

    open('plik.txt', 'a').then((_fd) => {
        fd = _fd;
        write(fd, 'A z promisami też się może zapisze?\n');
    }).then(() => close(fd)).catch((reason) => {
        console.log('Błąd był straszliwy!', reason);
    });
}

async function writeSomething() {
    let open = promisify(fs.open);
    let write = promisify(fs.write);
    let close = promisify(fs.close);
    let fd = -1;

    try {
        fd = await open('plik3.txt', 'a');
        await write(fd, 'To jeszcze z async/await');
        await close(fd);
        console.log("OK");
    } catch (e) {
        console.log('Jakiś błąd w trakcie zapisywania', e);
        if (fd != -1) {
            await close(fd);
        }
    }
}

function files3() {
    try {
        writeSomething();
    }
    catch (e) {
        console.log(e);
    }
}
