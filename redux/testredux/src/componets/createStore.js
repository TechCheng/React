
function createStore(reducer){
	let state
  const listeners = []
  
  // 返回最新的 state
  function getState () {
  	return state
  }
  
  // 派发 action
  function dispatch(action){
  	state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  
  // 订阅，返回取消订阅函数
  function subscribe(listener){
  	listeners.push(listener)
    return function () {
    	const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
  
  // 获取state默认值
  dispatch({type: "@@redux/INIT1.s.m.m.c.n"})
  
  // 返回 store, 一个对象
  return {
  	getState,
    dispatch,
    subscribe
  }
}

export {
  createStore
}
