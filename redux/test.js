import { createStore } from 'redux';

const initState = [];
const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'add':
            return [...state, action.addedItem];
        case 'delete':
            return [...state.slice(0, action.deletedIndex), ...state.slice(action.deletedIndex + 1)];
        case 'clear':
            return []
        default:
            return state;
    }
};

const store = createStore(reducer);

// 订阅状态变化
store.subscribe(() => {
    console.log(store.getState());
})

// 添加一个项
store.dispatch({
    type: 'add',
    addedItem: 1
});

// 又添加一个项
store.dispatch({
    type: 'add',
    addedItem: 2
});

删除一个项
// store.dispatch({
    type: 'delete',
    deletedIndex: 0
});

// 清空状态 
store.dispatch({
    type: 'clear'
})
