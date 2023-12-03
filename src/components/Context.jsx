import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
      break;
    case "UPDATE":
      let arr = [...state];
      arr.find((data, index) => {
        if (data.id === action.id) {
          arr[index] = {
            ...data,
            qty: parseInt(action.qty) + data.qty,
            price: action.price + data.price,
          };
        }
        return arr;
      });
      return arr;
      break;
    case "DROP":
      let empArray = [];
      return empArray;
      break;
    default:
      console.log("Error on reducer");
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

const useDispatchCart = () => {
  return useContext(CartDispatchContext);
};
const useCart = () => {
  return useContext(CartStateContext);
};
export { AppProvider, useDispatchCart, useCart };
