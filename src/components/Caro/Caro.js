import React from "react";
import ReactDOM from "react-dom";
import Board from "../Board";
import "./Caro.css";

function calculateWinner(squares, w, h) {
  const lines = [];
  for (let i = 0; i < w * h; i++) {
    const left = [i, i - 1, i - 2, i - 3, i - 4];
    const right = [i, i + 1, i + 2, i + 3, i + 4];
    const top = [i, i - w, i - 2 * w, i - 3 * w, i - 4 * w];
    const bottom = [i, i + w, i + 2 * w, i + 3 * w, i + 4 * w];
    const topLeft = [
      i,
      i - (w + 1),
      i - (w + 1) * 2,
      i - (w + 1) * 3,
      i - (w + 1) * 4
    ];
    const topRight = [
      i,
      i - (w - 1),
      i - (w - 1) * 2,
      i - (w - 1) * 3,
      i - (w - 1) * 4
    ];
    const bottomLeft = [
      i,
      i + (w - 1),
      i + (w - 1) * 2,
      i + (w - 1) * 3,
      i + (w - 1) * 4
    ];
    const bottomRight = [
      i,
      i + (w + 1),
      i + (w + 1) * 2,
      i + (w + 1) * 3,
      i + (w + 1) * 4
    ];

    if (!left.some(value => value < 0 || value > w * h - 1)) {
      const lObs = left[0] - 5;
      const rObs = left[0] + 1;
      if (lObs >= 0 && rObs < w * h) {
        left.push(lObs, rObs);
      }

      lines.push(left);
    }
    if (!right.some(value => value < 0 || value > w * h - 1)) {
      const lObs = right[0] - 1;
      const rObs = right[0] + 5;
      if (lObs >= 0 && rObs < w * h) {
        right.push(lObs, rObs);
      }

      lines.push(right);
    }
    if (!top.some(value => value < 0 || value > w * h - 1)) {
      const tObs = top[0] - 5 * w;
      const bObs = top[0] + w;
      if (tObs >= 0 && bObs < w * h) {
        top.push(tObs, bObs);
      }

      lines.push(top);
    }
    if (!bottom.some(value => value < 0 || value > w * h - 1)) {
      const tObs = bottom[0] - w;
      const bObs = bottom[0] + 5 * w;
      if (tObs >= 0 && bObs < w * h) {
        bottom.push(tObs, bObs);
      }

      lines.push(bottom);
    }
    if (!topLeft.some(value => value < 0 || value > w * h - 1)) {
      const tlObs = topLeft[0] - (w + 1) * 5;
      const brObs = topLeft[0] + (w + 1);
      if (tlObs >= 0 && brObs < w * h) {
        topLeft.push(tlObs, brObs);
      }

      lines.push(topLeft);
    }
    if (!topRight.some(value => value < 0 || value > w * h - 1)) {
      const trObs = topRight[0] - (w - 1) * 5;
      const blObs = topRight[0] + (w - 1);
      if (trObs >= 0 && blObs < w * h) {
        topRight.push(trObs, blObs);
      }

      lines.push(topRight);
    }
    if (!bottomLeft.some(value => value < 0 || value > w * h - 1)) {
      const trObs = bottomLeft[0] - (w - 1);
      const blObs = bottomLeft[0] + (w - 1) * 5;
      if (trObs >= 0 && blObs < w * h) {
        bottomLeft.push(trObs, blObs);
      }

      lines.push(bottomLeft);
    }
    if (!bottomRight.some(value => value < 0 || value > w * h - 1)) {
      const tlObs = bottomRight[0] - (w + 1);
      const brObs = bottomRight[0] + (w + 1) * 5;
      if (tlObs >= 0 && brObs < w * h) {
        bottomRight.push(tlObs, brObs);
      }

      lines.push(bottomRight);
    }
  }
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length === 5) {
      const [a, b, c, d, e] = lines[i];
      const index = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        for (let j = 0; j < index.length; j++) {
          const val = document.getElementById(`${index[j]}`);
          // val.setAttribute('style[background]', 'blue');
          val.style.background = "blue";
        }
        return squares[a];
      }
    } else if (lines[i].length === 7) {
      const [a, b, c, d, e, f, g] = lines[i];
      const index = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        if (squares[f] && squares[g] && squares[f] === squares[g]) {
          return null;
        }
        for (let j = 0; j < index.length - 2; j++) {
          const val = document.getElementById(`${index[j]}`);
          // val.setAttribute('style[background]', 'blue');
          val.style.background = "blue";
        }
        return squares[a];
      }
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          // squares: [...Array(400).keys()]
          squares: Array(400).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      width: 20,
      height: 20,
      sort: "ASC",
      positions: []
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const pos = this.state.positions.slice(0, this.state.stepNumber + 1);
    pos.push(i);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (
      calculateWinner(squares, this.state.width, this.state.height) ||
      squares[i]
    ) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      positions: pos
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
    const btns = document.getElementsByClassName("one-bold");
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.fontWeight = "normal";
    }
    const id = `btn-${step}`;
    document.getElementById(id).style.fontWeight = "bold";
  }

  sort() {
    let s = 0;
    if (this.state.sort === "ASC") s = "DESC";
    else s = "ASC";
    this.setState({
      sort: s
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(
      current.squares,
      this.state.width,
      this.state.height
    );

    const moves = history.map((step, move) => {
      const pos = this.state.positions[move];
      const row = Math.floor(pos / this.state.width);
      const col = pos % this.state.width;
      const desc = move
        ? `Go to move #[${row}][${col}]`
        : `Go to game start #[${row}][${col}]`;
      const id = `btn-${move}`;
      if (this.state.positions[move]) {
        return (
          <li key={id}>
            <button
              type="button"
              id={id}
              className="btn btn-primary one-bold"
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      }
      return <div key={id} />;
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            key={this.state.width}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol id="moves">{moves}</ol>
        </div>
        <button
          id="sort"
          type="button"
          className="btn btn-light"
          onClick={() => this.sort()}
        >
          {this.state.sort}
        </button>
        <a className="nav-link" href="/user/updateinfo">
          UPDATE INFO
        </a>
        <div className="chat">
          <div className="container">
            <img
              src="https://www.w3schools.com/w3images/bandmember.jpg"
              alt="Avatar"
            />
            <p>Hello. How are you today?</p>
            <span className="time-right">11:00</span>
          </div>

          <div className="container darker">
            <img
              src="https://www.w3schools.com/w3images/avatar_g2.jpg"
              alt="Avatar"
              className="right"
            />
            <p>Hey! I&#39;m fine. Thanks for asking!</p>
            <span className="time-left">11:01</span>
          </div>

          <div className="container">
            <img
              src="https://www.w3schools.com/w3images/bandmember.jpg"
              alt="Avatar"
            />
            <p>Sweet! So, what do you wanna do today?</p>
            <span className="time-right">11:02</span>
          </div>

          <div className="container darker">
            <img
              src="https://www.w3schools.com/w3images/avatar_g2.jpg"
              alt="Avatar"
              className="right"
            />
            <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
            <span className="time-left">11:05</span>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

export default Game;
