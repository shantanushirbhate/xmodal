import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [showModal]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Empty Validation
    if (!username || !email || !phone || !dob) {
      alert("Please fill out this field.");
      return;
    }

    // Email Validation
    if (!email.includes("@")) {
      alert(
        "Invalid email. Please check your email address."
      );
      return;
    }

    // Phone Validation
    if (phone.length !== 10 || isNaN(phone)) {
      alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return;
    }

    // DOB Validation
    let today = new Date();
    let selectedDate = new Date(dob);

    if (selectedDate > today) {
      alert(
        "Invalid date of birth. Date of birth cannot be in the future."
      );
      return;
    }

    // Reset & Close Modal
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: ""
    });

    setShowModal(false);
  };

  return (
    <div className="app">
      {/* Initial Heading */}
      <div className="home-content">
        <h1>User Details Modal</h1>

        {!showModal && (
          <button
            className="open-button"
            onClick={() => setShowModal(true)}
          >
            Open Form
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>User Details Form</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;