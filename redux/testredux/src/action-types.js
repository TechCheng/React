function add() {
  return { type: 'ADD' }
}

function minus() {
  return { type: 'MINUS' }
}

const actions = { add, minus }

export default actions