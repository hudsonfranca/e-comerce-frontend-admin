import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../../../../services/Api";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: any) => void;
  showAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchAddBar: React.FC<Props> = ({ onSubmit, showAddModal }) => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <nav className="navbar navbar-light bg-light p-4">
      <Form
        inline
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (inputValue) {
            onSubmit(e, inputValue);
          }
        }}
      >
        <FormControl
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          value={inputValue}
          type="text"
          placeholder="Id..."
          className=" mr-sm-2"
        />
        <Button type="submit">Search</Button>
      </Form>
      <Button variant="primary" onClick={() => showAddModal(true)}>
        ADD Product
      </Button>
    </nav>
  );
};

export default SearchAddBar;
