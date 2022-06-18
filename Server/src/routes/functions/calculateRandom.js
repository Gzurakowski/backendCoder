process.on('message', (amount) => {
    const numbers = {};
    for (let i = 0; i < amount; i++) {
        const random = generateRandom();
        if(numbers[random]) {
            numbers[random] += 1;
        }else{
            numbers[random] = 1;
        }
    }
    process.send(numbers);
})


const generateRandom = () => {
    const random = Math.floor(Math.random() * 1000) + 1;
    return random;
}