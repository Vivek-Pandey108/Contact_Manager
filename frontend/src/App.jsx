import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [contacts, setContacts] = useState([]);

  //  fetch contacts 
  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:3000/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  //  validation 
  const validateField = (name, value) => {
    let e = "";

    if (name === "name" && !value.trim()) e = "Name is required";

    if (name === "phone") {
      if (!value.trim()) e = "Phone is required";
      else if (value.length < 10) e = "Phone must be at least 10 digits";
    }

    if (name === "email") {
      if (value && !/\S+@\S+\.\S+/.test(value)) e = "Invalid email format";
    }

    setErrors((prev) => ({ ...prev, [name]: e }));
  };

  //  handle field change 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    validateField(name, value);
  };

  //  submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // final validation
    Object.keys(form).forEach((key) => validateField(key, form[key]));

    const hasError = Object.values(errors).some((x) => x);
    if (hasError || !form.name || !form.phone) return;

    await axios.post("http://localhost:3000/api/contacts", form);

    setSuccess("Contact added successfully!");
    setTimeout(() => setSuccess(""), 2000);

    setForm({ name: "", email: "", phone: "", message: "" });

    fetchContacts();
  };

  //  delete 
  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:3000/api/contacts/${id}`);

    setSuccess("Contact deleted successfully!");
    setTimeout(() => setSuccess(""), 2000);

    fetchContacts();
  };

  const isDisabled =
    !form.name.trim() ||
    !form.phone.trim() ||
    errors.email ||
    errors.phone ||
    errors.name;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Contact Manager</h2>

      {success && (
        <div style={{ color: "green", marginBottom: "8px" }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          style={{ display: "block", width: "30%", marginBottom: "5px" }}
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <small style={{ color: "red" }}>{errors.name}</small>

        <input
          name="email"
          style={{ display: "block", width: "30%", marginBottom: "5px" }}
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <small style={{ color: "red" }}>{errors.email}</small>

        <input
          name="phone"
          style={{ display: "block", width: "30%", marginBottom: "5px" }}
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <small style={{ color: "red" }}>{errors.phone}</small>

        <textarea
          name="message"
          style={{ display: "block", width: "30%", marginTop: "5px" }}
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />

        <button style={{ marginTop: "10px" }} disabled={isDisabled}>
          Submit
        </button>
      </form>

      <h3>Saved Contacts</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.message}</td>
              <td>
                <button onClick={() => deleteContact(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
