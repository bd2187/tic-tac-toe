import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: false
    };
  }

  handleSquare(i) {
    // Create copy of squares array from this.state
    const squares = [...this.state.squares];

    // return function if winner is calculated or square is already taken
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Refer to index in array. If xIsNext is true, squares[i]'s value will be 'X'
    // Otherwise, the value is 'O'.
    squares[i] = this.state.xIsNext ? "X" : "O";

    // Update State
    this.setState({ squares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={this.handleSquare.bind(this, i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    winner
      ? (status = `Winner: ${winner}`)
      : (status = `Next player: ${this.state.isNext ? "X" : "O"}`);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
