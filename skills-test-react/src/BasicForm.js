import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "./redux/todoSlice";
import "./BasicForm.css";

const TODO_SCHEMA = [
  {
    propertyName: "name",
    displayName: "Name",
  },
  {
    propertyName: "description",
    displayName: "Description",
  },
  {
    propertyName: "other",
    displayName: "Other",
  },
];

const BasicForm = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const todoFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      other: "",
    },
    onSubmit: (values) => {
      dispatch(addTask(values));
    },
  });

  const submitHandler = (ev) => {
    ev.preventDefault();
    todoFormik.submitForm();
  };

  const removeTaskById = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div className="todo-list">
      <h1>TODO</h1>
      <Card sx={{ padding: "1rem" }}>
        <form className="todo-list-form" onSubmit={submitHandler}>
          {TODO_SCHEMA.map((item) => (
            <div key={item.propertyName}>
              <Typography htmlFor={item.propertyName} mr={1}>
                {item.displayName}:
              </Typography>
              <TextField
                id={item.propertyName}
                name={item.propertyName}
                size="small"
                sx={{ flex: "1" }}
                onChange={todoFormik.handleChange}
                value={todoFormik.values[item.propertyName]}
              />
            </div>
          ))}
          <IconButton type="submit">
            <Add />
          </IconButton>
        </form>
      </Card>
      {todos.length > 0 && (
        <Card sx={{ marginTop: "1rem" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {TODO_SCHEMA.map((column) => (
                    <TableCell key={column.propertyName} sx={{fontWeight: 'bold'}}>
                      {column.displayName}
                    </TableCell>
                  ))}
                  <TableCell width={5}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    {TODO_SCHEMA.map((item) => (
                      <TableCell key={todo.id + item.propertyName}>
                        {todo[item.propertyName]}
                      </TableCell>
                    ))}
                    <TableCell width={5}>
                      <IconButton onClick={() => removeTaskById(todo.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </div>
  );
};

export default BasicForm;
