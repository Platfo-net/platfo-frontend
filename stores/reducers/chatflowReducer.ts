import { Action } from "@reduxjs/toolkit";
import { EdgeData, NodeData } from "reaflow";
import { actionTypes } from "../actionTypes";
import { updateObject } from "./updateObject";

export type ChatflowState = {
  chatflow: {
    nodes: NodeData[];
    edges: EdgeData[];
    selections: string[];
  };
};

export const initialState = {
  nodes: [
    {
      id: "1",
      text: "1",
    },
    {
      id: "2",
      text: "2",
    },
  ],
  edges: [],
  selections: [],
};

export const chatflowReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.CHANGE_NODES:
      return updateObject(state, {
        nodes: action.nodes,
      });
    case actionTypes.CHANGE_EDGES:
      return updateObject(state, {
        edges: action.edges,
      });
    case actionTypes.CHANGE_SELECTIONS:
      return updateObject(state, {
        selections: action.selections,
      });
    default:
      return state;
  }
};
