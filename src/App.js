import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import pendu1 from './assets/pendu1.png';
import pendu2 from './assets/pendu2.png';
import pendu3 from './assets/pendu3.png';
import pendu4 from './assets/pendu4.png';
import pendu5 from './assets/pendu5.png';
import pendu6 from './assets/pendu6.png';
import pendu7 from './assets/pendu7.png';
import pendu8 from './assets/pendu8.png';

class App extends Component {

  state = {
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
      "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    words: this.generateWord(),
    lettersUsed: [],
    score: 0,
    players: ["Joueur1", "Joueur2"],
    currentPlayer: "Joueur1",
    nbBadAnswer: 0
  }

  generateWord() {
    const tab = ["BONJOUR", "AUREVOIR", "ABRICOT", "PARIS SAINT GERMAIN",
      "JE SUIS UN DIEUX DU PENDU"]
    return shuffle(tab)
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
    )
  }

  handleKeyClick = letter => ev => {
    let { lettersUsed, score, words, nbBadAnswer } = this.state
    if (lettersUsed.includes(letter)) {
      score -= 2
      this.changePlayer()
    } else {
      if (words[0].includes(letter)) {
        score += 2
      } else {
        this.changePlayer()
        nbBadAnswer++
        score -= 1
      }
      lettersUsed.push(letter)
      this.setState({ lettersUsed, nbBadAnswer })
    }
    this.setState({ score })
  }

  handleRestartClick = () => {
    let { lettersUsed, words, score, nbBadAnswer } = this.state
    lettersUsed = []
    words = this.generateWord()
    score = 0
    nbBadAnswer = 0
    this.setState({ lettersUsed, words, score, nbBadAnswer })
  }

  changePlayer = () => {
    let { players, currentPlayer } = this.state
    currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0]
    this.setState({ currentPlayer })
  }

  updateInput = (ev) => {
    let { words, lettersUsed, players, currentPlayer } = this.state
    if (ev.keyCode === 13) {
      if (ev.target.value.toUpperCase() === words[0]) {
        for (let i = 0; i < words[0].length; i++)
          lettersUsed.push(words[0][i])
      } else {
        currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0]
      }
    }
    this.setState({ lettersUsed, currentPlayer })
  }

  render() {
    const { letters, words, lettersUsed, score, currentPlayer, nbBadAnswer } = this.state
    let word = this.computeDisplay(words[0], lettersUsed)
    return (
      <div className="App">
        { word.includes('_') ? <h3>À vous: {currentPlayer}</h3> : null }
        { word.includes('_') ? <h2>{score}</h2> : null }
        { word.includes('_') ? null : <h1>{currentPlayer} WON !!!</h1> }
        <img src={ (nbBadAnswer === 0) ? pendu1 : (nbBadAnswer === 1) ? pendu2 :
          (nbBadAnswer === 2) ? pendu3 : (nbBadAnswer === 3) ? pendu4 :
          (nbBadAnswer === 4) ? pendu5 : (nbBadAnswer === 5) ? pendu6 :
          (nbBadAnswer === 1) ? pendu7 : pendu8 } alt="pendu"/>
        <h1>{word}</h1>
        {word.includes('_') && letters.slice(0, 13).map((letters, index) => (
          <button
            key={index}
            className={ (lettersUsed.includes(letters)) ? "taged" : null }
            onClick={this.handleKeyClick(letters)}>
            {letters}
          </button>
        ))}
        <br/>
        {word.includes('_') && letters.slice(13).map((letters, index) => (
          <button
            key={index}
            className={ (lettersUsed.includes(letters)) ? "taged" : null }
            onClick={this.handleKeyClick(letters)}>
            {letters}
          </button>
        ))}
        <br/>
        { word.includes('_') ? <label htmlFor="guess">Try to guess :</label> : null }
        { word.includes('_') ?
          <input onKeyDown={this.updateInput}
          type="guess" name="guess"></input> : null }
        { word.includes('_') ? null : <button onClick={this.handleRestartClick}>RESTART</button> }
      </div>
    )
  }
}

export default App;
