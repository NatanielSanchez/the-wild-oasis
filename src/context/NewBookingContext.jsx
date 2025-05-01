/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { useQueryParam } from "../hooks/useQueryParam";

const initialState = {
  currentStep: 1,
  selectedCabinId: null,
  dates: null, // {start: date, end: date}
  numOccupants: 1,
  observations: "",
};

const NewBookingContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "previousStep":
      return {
        ...state,
        currentStep: state.currentStep > 1 ? state.currentStep - 1 : state.currentStep,
      };
    case "nextStep":
      return {
        ...state,
        currentStep:
          state.currentStep <= 4 && canGoNext(state) ? state.currentStep + 1 : state.currentStep,
      };
    case "setCurrentStep":
      return { ...state, currentStep: action.payload };
    case "setGuestNationalId":
      return { ...state, guestNationalId: action.payload };
    case "setSelectedCabinId":
      return { ...state, selectedCabinId: action.payload, dates: null };
    case "setDates":
      return { ...state, dates: action.payload };
    case "setNumOccupants":
      return { ...state, numOccupants: action.payload };
    case "setObservations":
      return { ...state, observations: action.payload };
    default:
      throw new Error("Unknown action type received: " + action.type);
  }
}

function canGoNext(state) {
  switch (state.currentStep) {
    case 1:
      return true;
    case 2:
      return state.selectedCabinId !== null;
    case 3:
      return true;
    case 4:
      return (
        state.guestNationalId !== null && state.selectedCabinId !== null && state.dates !== null
      ); // numOccupants defaults to 1, and observations are optional
    case 5:
      return false; // steps completed!
    default:
      throw new Error("Something went wrong while verifying the steps!");
  }
}

function NewBookingProvider({ children }) {
  const { queryParam, setQueryParam } = useQueryParam("guestNationalId");
  const [state, dispatch] = useReducer(reducer, {
    guestNationalId: queryParam,
    ...initialState,
  });

  const { currentStep, guestNationalId, selectedCabinId, dates, numOccupants, observations } =
    state;
  return (
    <NewBookingContext.Provider
      value={{
        currentStep,
        guestNationalId,
        selectedCabinId,
        dates,
        numOccupants,
        observations,
        isCurrentStepCompleted: canGoNext(state),
        // custom dispatcher
        dispatch: (action) => {
          if (action.type === "setGuestNationalId") setQueryParam(action.payload);
          dispatch(action);
        },
      }}
    >
      {children}
    </NewBookingContext.Provider>
  );
}

function useNewBooking() {
  const context = useContext(NewBookingContext);
  if (!context) throw new Error("NewBookingContext was used outside of the Provider!");
  return context;
}

export { NewBookingProvider, useNewBooking };
