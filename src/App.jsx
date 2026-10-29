import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="card">
      <h2>Welcome to Vitality Now</h2>
      <p>
        Join our Health &amp; Wellness community for weekly nutrition guides,
        guided workouts and mindful-living tips. Registration takes less than a
        minute.
      </p>
      <Link className="button" to="/register">
        Register Now
      </Link>
    </div>
  );
}

const EMPTY = {
  name: "",
  email: "",
  password: "",
  age: "",
  mobile: "",
  gender: "",
  state: ""
};

// Returns an error message per field, or "" when the field is valid.
function validate(f) {
  return {
    name: !f.name.trim()
      ? "Full name is required."
      : !/^[A-Za-z ]+$/.test(f.name.trim())
      ? "Name must contain letters and spaces only."
      : "",
    email: !f.email
      ? "Email address is required."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)
      ? "Enter a valid email address."
      : "",
    password: !f.password
      ? "Password is required."
      : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(f.password)
      ? "Use uppercase, lowercase, a number and at least 8 characters."
      : "",
    age: !f.age
      ? "Age is required."
      : !/^\d+$/.test(f.age) || Number(f.age) < 18 || Number(f.age) > 30
      ? "Age must be between 18 and 30."
      : "",
    mobile: !f.mobile
      ? "Mobile number is required."
      : !/^\d{10}$/.test(f.mobile)
      ? "Enter exactly 10 digits."
      : "",
    gender: !f.gender ? "Gender is required." : "",
    state: !f.state ? "State is required." : ""
  };
}

function Field({ label, name, error, children }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <small id={name + "-err"} role="alert">
          {error}
        </small>
      )}
    </>
  );
}

function Register() {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const valid = Object.values(errors).every((e) => !e);
  const shown = (n) => (touched[n] ? errors[n] : "");

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
    setSubmitted(false);
  };
  const blur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) {
      setSubmitted(true);
      setForm(EMPTY);
      setTouched({});
    }
  };

  const common = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: updateField,
    onBlur: blur,
    "aria-invalid": !!shown(name),
    "aria-describedby": shown(name) ? name + "-err" : undefined,
    required: true
  });

  return (
    <div className="card">
      <h2>Member Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Field label="Full Name" name="name" error={shown("name")}>
          <input {...common("name")} placeholder="Enter your name" />
        </Field>
        <Field label="Email Address" name="email" error={shown("email")}>
          <input {...common("email")} type="email" placeholder="Enter your email" />
        </Field>
        <Field label="Password" name="password" error={shown("password")}>
          <input {...common("password")} type="password" placeholder="Minimum 8 characters" />
        </Field>
        <Field label="Age" name="age" error={shown("age")}>
          <input {...common("age")} type="number" placeholder="Enter age (18-30)" />
        </Field>
        <Field label="Mobile Number" name="mobile" error={shown("mobile")}>
          <input {...common("mobile")} type="tel" placeholder="10-digit mobile number" />
        </Field>
        <Field label="Gender" name="gender" error={shown("gender")}>
          <select {...common("gender")}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="State" name="state" error={shown("state")}>
          <select {...common("state")}>
            <option value="">Select state</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </Field>
        <button type="submit" disabled={!valid}>
          Submit Registration
        </button>
        {submitted && (
          <p className="success" role="status">
            Registration completed successfully! Welcome to Vitality Now.
          </p>
        )}
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <header>
        <h1>VITALITY NOW</h1>
        <p className="tagline">Health &amp; Wellness Blog</p>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/register">Registration</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
