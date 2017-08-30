import { List, Map } from 'immutable';

function getWinner(votes) {
  if (!votes) {
    return [];
  }
  const [a, b] = votes.get('pair');
  const aVotes = votes.getIn(['tally', a], 0);
  const bVotes = votes.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  }
  return [a, b];
}

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const winners = getWinner(state.get('vote'));
  const entries = state.get('entries');
  if (entries.size === 0) {
    return state.remove('vote').remove('entries').set('winner', winners[0]);
  }
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2).concat(winners),
  });
}

export function vote(state, entry) {
  return state.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1,
  );
}
