import { EdgeData, NodeData } from "reaflow";
import actionTypes from "stores/actionTypes";
import { AppDispatch } from "stores/store";

export const changeNodes = (value: NodeData[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: actionTypes.CHANGE_NODES,
    nodes: value,
  });
};

export const changeEdges = (value: EdgeData[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: actionTypes.CHANGE_EDGES,
    edges: value,
  });
};

export const changeSelections =
  (value: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SELECTIONS,
      selections: value,
    });
  };
