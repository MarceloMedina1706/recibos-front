import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./Index";
import SubmenuSlice from "./Submenu-slice";

const actions = SubmenuSlice.actions;

export const showSubmenu = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.showSubmenu())
    }
}

export const closeSubmenu = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.closeSubmenu())
    }
}

export const setOpenSubmenu = (state: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.setOpenSubmenu(state))
    }
}

export const showModal = (typeForm: number): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.showModal(typeForm))
    }
}

export const closeModal = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.closeModal())
    }
}

export const resetSubmenuState = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(actions.resetSubmenuState())
    }
}
