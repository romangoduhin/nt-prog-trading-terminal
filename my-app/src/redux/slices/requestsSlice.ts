import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit';
import {RequestsState} from "../types";
import {FormSubmitValues, Request, ReqUpdateValues} from "../../types/globalTypes";
import {getCurrentDate} from "../../helpers/getCurrentDate";

const initialState: RequestsState = {
    requests: [],
    tickers: [1, 2],
}

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addRequest: (state, action: PayloadAction<FormSubmitValues>) => {
            const reqData: Request = {
                id: action.payload.id,
                creationTime: getCurrentDate(),
                changeTime: getCurrentDate(),
                status: 'active',
                side: action.payload.side,
                price: action.payload.price,
                amount: action.payload.amount,
                instrument: action.payload.instrument,
            }
            state.requests.push(reqData)
        },
        updateRequestStatus: (state, action: PayloadAction<ReqUpdateValues>) => {
            state.requests = state.requests.map(el => {
                if (el.id === action.payload.id) {
                    const newEl = {...el}
                    newEl.status = action.payload.status
                    newEl.changeTime = getCurrentDate()
                    return newEl
                }
                return el;
            })
        },
        addTicker: (state) => {
            const lastItem = state.tickers[state.tickers.length - 1]
            state.tickers.push(lastItem + 1)
        },
        removeTicker: (state, action: PayloadAction<{ id: number }>) => {
            state.tickers = state.tickers.filter(el => el !== action.payload.id)
        }
    },
})

export const {addRequest, updateRequestStatus, addTicker, removeTicker} = requestsSlice.actions;
export default requestsSlice.reducer;