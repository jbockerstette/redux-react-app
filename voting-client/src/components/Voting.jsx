import React from 'react';
import Winner from './Winner.jsx';
import Vote from './Vote.jsx';

export default class Voting extends React.Component {

  render() {
    return <div>
      {this.props.winner ? <Winner ref="winner" winner={this.props.winner}/> :
        <Vote {...this.props}/>
      }
    </div>;
  }
}
