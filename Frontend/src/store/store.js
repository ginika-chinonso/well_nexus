import { configureStore } from '@reduxjs/toolkit'
import LayoutsReducer from './features/layout'
import MessengerReducer from './features/messenger'

const store = configureStore({
    reducer: {
        'layout': LayoutsReducer,
        'messenger': MessengerReducer,
    },
})

export default store