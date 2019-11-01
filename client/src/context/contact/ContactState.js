// usereducer access to state and dispatch
import React, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./ContactContext";
import contactReducer from "./ContactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        type: "professional",
        id: "5dbc0d8d468b695ec2cdb261",
        name: "Sarah",
        email: "sarah@hii.od",
        phone: "123-123-123"
      },
      {
        type: "personal",
        id: "5dbc0eab468b695ec2cdb262",
        name: "Maria",
        email: "sarah@hii.od",
        phone: "123-123-123"
      }
    ],
    current: null
  };

  // state allows us to access anything in state
  // dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts

  // clear filter

  return (
    <contactContext.Provider
      value={{
        // anything that we wanna be able to access from other components including state and actions need to go in here
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
