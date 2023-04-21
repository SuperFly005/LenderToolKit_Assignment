import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AccountMenu from "./AccountMenu";
import BasicForm from "./BasicForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const [openForm, setOpenForm] = React.useState(false);
  const handleOnClick = (page) => {
    console.log("open");
    if (!openForm) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountMenu />} />
          <Route path="/todo" element={<BasicForm />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
