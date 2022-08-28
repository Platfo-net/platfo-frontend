import { v4 as uuidv4 } from "uuid";

export const createStartNodeData = () => {
  const node = {
    id: uuidv4(),
    text: " ",
    width: 90,
    height: 90,
    data: {
      type: "start",
    },
    ports: [
      {
        id: uuidv4(),
        width: 20,
        height: 20,
        side: "WEST",
        className: "active-port"
      },
    ],
  };

  return node;
};

export const createDefaultMenuNodeData = () => {
  const node = {
    id: uuidv4(),
    text: " ",
    width: 90,
    height: 90,
    data: {
      type: "menu",
      question: "",
      choices: [],
    },
    ports: [
      {
        id: uuidv4(),
        width: 10,
        height: 10,
        side: "EAST",
        disabled: true
      },
      {
        id: uuidv4(),
        width: 20,
        height: 20,
        side: "WEST",
        className: "active-port"
      },
    ],
    hasDeleteAction: true,
  };

  return node;
};

export const createDefaultTextNodeData = () => {
  const node = {
    id: uuidv4(),
    text: " ",
    width: 90,
    height: 90,
    data: {
      type: "text",
      value: "",
    },
    ports: [
      {
        id: uuidv4(),
        width: 10,
        height: 10,
        side: "EAST",
        disabled: true
      },
      {
        id: uuidv4(),
        width: 20,
        height: 20,
        side: "WEST",
        className: "active-port"
      },
    ],
    hasDeleteAction: true,
    hasEditAction: true,
  };

  return node;
};

export type PositionMargin = {
  top?: number;
  left?: number;
};

export const translateXYToCanvasPosition = (
  x: number,
  y: number,
  margin?: PositionMargin
): [x: number, y: number] => {
  const xDelta = 0; // No delta, because the canvas takes the full page width
  const yDelta = 60; // Some delta, because the canvas is not at the top of the page, but below the header

  return [x - xDelta + (margin?.left || 0), y - yDelta + (margin?.top || 0)];
};
