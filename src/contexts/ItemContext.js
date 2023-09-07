import {React, createContext, useEffect, useReducer, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "my_super_secret_key";

const  actionTypes = {
    create: 'Create',
    updateScreen: 'UpdateScreen',
    delete: 'Delete',
    save: 'Save',
    load: 'Load',
}

const ItemContext = createContext();

let initialState = [
    // {
    //     id: 1,
    //     competition: "holiday",
    //     date: "Mon Oct 10 2022",
    //     rinkNo: "5",
    //     teamOneName: "A",
    //     teamTwoName: "B",
    //     teamOne: ["sam", "tammy", "tim"],
    //     teamTwo: ["hey", "sup", "hi"],
    //     teamOneShots: ["6", "2", "0"],
    //     teamTwoShots: ["0", "0", "3"],
    //     images: []
    // }
                  
  ]

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.create:
            return[
                ...state, 
                {
                    id: state.length === 0 ? state.length+1 : state[state.length-1].id +1,
                    //state.length
                    // === 0 ? 0 : state[state.length-1].id +1,
                    competition: action.payload.competition,
                    date: action.payload.date,
                    rinkNo: action.payload.rinkNo,
                    teamOneName: action.payload.teamOneName,
                    teamTwoName: action.payload.teamTwoName,
                    teamOne: action.payload.teamOne,
                    teamTwo: action.payload.teamTwo,
                    teamOneShots: action.payload.teamOneShots,
                    teamTwoShots: action.payload.teamTwoShots,
                    images: action.payload.images
                }
            ];
        case actionTypes.updateScreen:
            return state.map((item) => {
                if (item.id == action.payload.id)
                {
                    return action.payload;
                }
                else
                {
                    return item;
                }
            });
        case actionTypes.delete:
            return state.filter((item) => 
                item.id !== action.payload.id
            )
        case actionTypes.save:
            try{
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
                // console.log("saved")
            }
            catch(e)
            {
                console.log(e);
            }
            finally{
                return state;
            }
        case actionTypes.load:
            return [
                ...state, {
                    id: action.payload.id,
                    competition: action.payload.competition,
                    date: action.payload.date,
                    rinkNo: action.payload.rinkNo,
                    teamOneName: action.payload.teamOneName,
                    teamTwoName: action.payload.teamTwoName,
                    teamOne: action.payload.teamOne,
                    teamTwo: action.payload.teamTwo,
                    teamOneShots: action.payload.teamOneShots,
                    teamTwoShots: action.payload.teamTwoShots,
                    images: action.payload.images
                }
            ]
        default:
            return state;
    }
}

export const ItemProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentState, setCurrentState] = useState();

    // console.log(state.length);

    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0){
                initialState = JSON.parse(storage);
                initialState.forEach(item => {
                    dispatch({type:actionTypes.load, payload: item})
                })
            }
        }
        loadStorage();
    }, [STORAGE_KEY])

    useEffect(() => {
        dispatch({type: actionTypes.save});
    }, [state])

    const addItem = (competition, date, rinkNo, teamOneName, teamTwoName, teamOne, teamTwo, teamOneShots,teamTwoShots,images, 
        callback) => {
        //let id = state[state.length-1].id +1
        let id = state.length === 0 ? state.length+1 : state[state.length-1].id +1
        dispatch({type: actionTypes.create, payload: {competition, date, rinkNo, teamOneName, teamTwoName, teamOne, teamTwo, teamOneShots,teamTwoShots, images
        } })
        dispatch({type: actionTypes.save});
        if(callback) {
            callback();
        }
        return id;
    }

    const updateScreen = (id, competition, date, rinkNo, teamOneName, teamTwoName, teamOne, teamTwo, teamOneShots,teamTwoShots, images, callback) => {
        dispatch({type: actionTypes.updateScreen, payload: {id, competition, date, rinkNo, teamOneName, teamTwoName, teamOne, teamTwo, teamOneShots,teamTwoShots, images, callback} })
        dispatch({type: actionTypes.save});
        if(callback) {
            callback();
        }
        
    }

    const deleteItem = (id, callback) => {
        dispatch ({type: actionTypes.delete, payload: {id: id}})
        dispatch({type: actionTypes.save});
        if(callback) {
            callback();
        }
    }

    

  return (
    <ItemContext.Provider
        value={{
            state: state,
            currentState, setCurrentState,
            create: addItem,
            updateScreen,
            deleteItem

        }}
        >
        {children}
    </ItemContext.Provider>
  )
}

export default ItemContext