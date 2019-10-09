import React from "react";

function Square(props) {
  return (
    <button
      width="30px"
      height="30px"
      id={props.id}
      type="button"
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 20,
      height: 20
    };
  }

  renderSquare(i) {
    return (
      <Square
        id={i}
        key={i.toString()}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquaresInline(index, w) {
    const items = [];
    for (let i = index * w; i < index * w + w; i += 1) {
      items.push(this.renderSquare(i));
    }
    return items.map(item => item);
  }

  renderTable(w, h) {
    const table = [];
    for (let i = 0; i < h; i += 1) {
      table.push(
        <div className="board-row" key={i}>
          {this.renderSquaresInline(i, w)}
        </div>
      );
    }
    return table;
  }

  render() {
    return <div>{this.renderTable(this.state.width, this.state.height)}</div>;
  }
}

export default Board;
