import { useState, useEffect } from 'react'

let globalState = {}
let listeners = []
let actions = {}

//if we manage data inside the hook, it will not be accesible to other components, only inside the componnet
//that uses that hook
export const useStore = () => {
	const setState = useState(globalState)[1]
	const dispatch = (actionIdentifier, payload) => {
		const newState = actions[actionIdentifier](globalState, payload)
		globalState = { ...globalState, ...newState }
		for (const listener of listeners) {
			listener(globalState)
		}
	}
	//every component that uses this custom hook will get its own function
	useEffect(() => {
		listeners.push(setState)
		return () => {
			//setState will be the same in a given component (CLOSURE)
			listeners = listeners.filter((l) => l !== setState)
		}
	}, [setState])

	return [globalState, dispatch]
}

export const initSore = (userActions, initialState) => {
	if (initialState) {
		globalState = {
			...globalState,
			initialState,
        }
        actions = {...actions, ...userActions}
	}
}
