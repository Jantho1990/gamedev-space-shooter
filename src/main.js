const myGuess = Math.floor(Math.random() * 20) + 1
let guesses = 0
let guess

while (guess !== myGuess) {
    guess = parseInt(prompt("What number am I thinking of?"), 10)
    guesses++
    if (guess < myGuess) {
        alert('Higher')
        console.log('burp')
    } else if (guess > myGuess) {
        alert('Lower')
        console.log('lower')
    }
}

alert(`Well done! You got it in ${guesses} guesses!`)