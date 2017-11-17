import React, { Component } from 'react-phaser'

const assets = {
  sky: {
    type: 'image',
    src: '../../images/sky.png',
  },
  ground: {
    type: 'image',
    src: '../../images/platform.png',
  },
  star: {
    type: 'image',
    src: '../../images/star.png',
  },
  dude: {
    type: 'spritesheet',
    src: '../../images/dude.png',
    width: 32,
    height: 48,
  },
  button: {
    type: 'spritesheet',
    src: '../../images/button_sprite_sheet.png',
    width: 193,
    height: 71,
  },
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  render() {
    return (
      <game assets={assets} width={800} height={600}>
        <sprite name="dood" x={32} y={450} assetKey="dude" />
      </game>
    );
  }
}

// const Game = React.createClass ({
//
//   render: function() {
//     return (
//       <game assets={assets} width={800} height={600}>
//         <sprite name="dood" x={32} y={450} assetKey="dude" />
//       </game>
//     );
//   }
// });

export default Game;
