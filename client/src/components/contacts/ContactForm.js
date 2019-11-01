import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const defaultState = {
    name: "",
    email: "",
    phone: "",
    type: "personal"
  };

  useEffect(() => {
    if (current != null) {
      setContact(current);
    } else {
      setContact(defaultState);
    }
  }, [contactContext, current]);

  /* instead of setting each field to its own piece of state like (setName, setEmail, ...) we gonna have single piece of state of
  contact which will be an object with all the field
  */
  const [contact, setContact] = useState(defaultState);

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type='text'
        autoComplete='false'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        autoComplete='false'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        autoComplete='false'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      professional{" "}
      <div>
        <input
          type='submit'
          value={current ? "Update Contact" : "Add Contact"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button
            type='submit'
            className='btn btn-light btn-block'
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
