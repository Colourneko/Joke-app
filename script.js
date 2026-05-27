class jokeApp{
         async getJoke(){
            const response = await fetch("https://api.chucknorris.io/jokes/random");
            const data = await response.json();
            const joke = data.value;
const jokeElement = document.querySelector("#joke-text");
            jokeElement.textContent = joke;

    }
saveJoke(joke) {
    const arr = JSON.parse(localStorage.getItem("savedJokes")) || [];
    arr.push(joke);
    localStorage.setItem("savedJokes", JSON.stringify(arr));
    this.displaySavedJokes();
}
displaySavedJokes() {
    const savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
    const savedJokesText = document.querySelector("#saved-jokes-text");
    savedJokesText.textContent = "Saved Jokes:\n" + savedJokes.join("\n");
}
    addEventListeners(){
        const button = document.querySelector("#joke-btn");
        const savebutton = document.querySelector("#save-btn");
button.addEventListener("click", () => {this.getJoke()});
savebutton.addEventListener("click", () => {this.saveJoke(document.querySelector("#joke-text").textContent)});
    }
    
}

const app = new jokeApp();
app.addEventListeners();
app.displaySavedJokes();