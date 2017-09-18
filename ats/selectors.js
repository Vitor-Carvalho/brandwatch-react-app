import AxiomIds from 'bw-axiom/at_ids';
import ReactAppIds from '../at_ids';

const wrapIds = (ids, selector) => Object
  .entries(ids)
  .reduce((ids, [key, value]) => Object.assign({}, ids, {
    [key]: typeof value === 'string' ? selector(value) : wrapIds(value, selector),
  }), {});

export const AxiomSelectors = wrapIds(AxiomIds, (id) => `[data-ax-at="${id}"]`);
export const ReactAppSelectors = wrapIds(ReactAppIds, (id) => `[data-ra-at="${id}"]`);
