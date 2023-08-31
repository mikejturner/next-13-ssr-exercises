import produce from 'immer';

// in a `produce` function you can either
// - mutate the state through draftState and have either bare `return;` or break to get to the implicit bare return at the end or the function
// or
// - leave draftState untouched and return entirely new state e.g. `return action.value`
// Replacing draftState entirely doesn't work because you replace the proxy object entirely with some thing else
// e.g. (X don't do) draftState = action.value

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'init': {
        return action.value;
      }
      case 'add-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        draftState.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
