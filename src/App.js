import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Alert from "./components/Alert";
import ObjectID from "bson-objectid";
import Table from "./components/Table";
import Tooltip from "@mui/material/Tooltip";
import "./App.css";
import Form from "./components/Form";
import Search from "./components/Search";

function App() {
  const initialContact = { name: "", number: "" };
  const [contact, setContact] = useState(initialContact);
  let peopleData = [];
  const [people, setPeople] = useState(peopleData);

  const initialAlert = {
    isOpen: false,
    severity: "success",
    message: "",
  };
  const [alert, setAlert] = useState(initialAlert);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const [search, setSearch] = useState("");
  const data =
    search !== ""
      ? people.filter(
          (person) =>
            person.name.includes(search) || person.number.includes(search)
        )
      : people;

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.number === "") {
      setAlert({
        isOpen: true,
        severity: "error",
        message: "Please fill all the fields!",
      });
      return;
    }
    closeModal();
    let duplicate = people.some((person) => person.number === contact.number);
    if (duplicate) {
      setAlert({
        isOpen: true,
        severity: "error",
        message: "Number already exists!",
      });
      setContact(initialContact);
      return;
    }
    const id = ObjectID().toHexString();
    peopleData = [
      ...people,
      { id, name: contact.name, number: contact.number },
    ];
    peopleData = peopleData.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    setPeople(peopleData);

    setContact(initialContact);
    setAlert({
      isOpen: true,
      severity: "success",
      message: "Contact added successfully!",
    });
  };
  const handleFilter = (e) => {
    e.preventDefault();
    let filteredPerson = people.filter((person) => person.name === search);
    setPeople(filteredPerson);
    setSearch("");
  };
  const handleEdit = (contact) => {
    setEdit(true);
    openModal();
    setContact(contact);
  };
  const handleEditSubmit = (contact) => {
    closeModal();
    let duplicate = people.filter((person) => person.number === contact.number);

    if (duplicate.length > 0 && duplicate[0].id !== contact.id) {
      setAlert({
        isOpen: true,
        severity: "error",
        message: "Number already exists!",
      });
      setContact(initialContact);
      setEdit(false);
      return;
    }
    let updatedPerson = people
      .map((person) => (person.id === contact.id ? contact : person))
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setPeople(updatedPerson);
    setContact(initialContact);
    setEdit(false);
  };
  const handleDelete = (id) => {
    let updatedList = people.filter((person) => person.id !== id);
    setPeople(updatedList);
  };

  return (
    <div className="app">
      <Alert handleClose={() => setAlert(initialAlert)} alert={alert} />
      <Form
        openModal={isModalVisible}
        closeModal={closeModal}
        edit={edit}
        contact={contact}
        setContact={setContact}
        handleSubmit={edit ? handleEditSubmit : handleSubmit}
      />
      <h1>Address Book</h1>
      <Tooltip title="Add new contact">
        <Fab color="primary" aria-label="add" onClick={openModal}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {people.length > 0 && (
        <Search
          setSearch={setSearch}
          search={search}
          handleFilter={handleFilter}
        />
      )}

      {data.length === 0 ? (
        <p className="no-data">Nothing to show</p>
      ) : (
        <Table
          people={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
