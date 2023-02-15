import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./Index";
import UISlice from "./UI-slice";

export const UIActions = UISlice.actions;

export const showHeader = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.showHeader())
    }
}

export const hideHeader = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.hideHeader())
    }
}

export const setShowContent = (state: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.setShowContent(state));
    }
} 

export const setChange = (state: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.setChange(state));
    }
}

export const setLoginFormLoading = (state: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.setLoginFormLoading(state));
    }
}

export const setPrimerLoginLoading = (state: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.setPrimerLoginLoading(state));
    }
}

export const resetUIState = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.resetUIState());
    }
} 