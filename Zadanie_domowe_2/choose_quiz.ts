(async function() {
    try {
        await start();
    }
    catch (err) {
        console.log(err);
    }

    async function start() {
        try {
            const token = document.querySelector('input[name="_csrf"]').getAttribute('value');
            await fetch('/', {
                credentials: 'same-origin',
                method: 'POST',
                body: JSON.stringify({
                    getQuizList: true,
                }),
                headers: {
                    'CSRF-Token': token,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then((data) => {
                const quizzes = data.quizzes;
                const els = document.getElementsByName('quiz');
                for (let i = 0; i < els.length; i++) {
                    const el = els[i] as HTMLInputElement;
                    el.value = quizzes[i];
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
})()