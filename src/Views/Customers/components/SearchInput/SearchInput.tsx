import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: any) => void;
}

const SearchInput: React.FC<Props> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <nav className="navbar navbar-light bg-light ">
      <Form
        inline
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          onSubmit(e, inputValue)
        }
      >
        <FormControl
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          value={inputValue}
          type="text"
          placeholder="Customer id..."
          className=" mr-sm-2"
        />
        <Button type="submit">Search</Button>
      </Form>
    </nav>
  );
};

export default SearchInput;
