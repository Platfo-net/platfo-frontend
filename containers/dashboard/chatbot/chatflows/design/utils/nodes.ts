import { v4 as uuidv4 } from "uuid";

export const createStartNodeData = () => {
  const node = {
    id: uuidv4(),
    text: "undefined",
    //   width: defaultProps.defaultWidth,
    //   height: defaultProps.defaultHeight,
    data: {
      type: "start",
    },
    ports: [],
  };

  return node;
};
