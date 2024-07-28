export default function paySystem(value, cardSystems) {
    let result;

    if (!value) {
        return;
    }

    const clean = value.replace(/[+ ()]/g,  ''); // удаляем +; ' ' и т.д.
    
    cardSystems.some(item => {
        item[2].some(number => {
            if (clean.startsWith(number)) {
                console.log(item[0]);
                result = item[0];
                return;
            }
        });
    })

    return result;
}