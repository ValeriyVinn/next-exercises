"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
    gender: "",
    agree: false,
    comment: "",
  });

function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  const target = e.target;
  const { name, value } = target;

  // Checkbox / radio
  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked,
    }));
    return;
  }

  // Усі інші типи
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Open console to see the data.");
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Signup Form</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        {/* Username */}
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        {/* Password */}
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {/* Select (role) */}
        <label>
          Select role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {/* Radio group */}
        <div>
          <p>Select gender:</p>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        {/* Checkbox */}
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the terms and conditions
        </label>

        {/* Textarea */}
        <label>
          Comment:
          <textarea
            name="comment"
            placeholder="Enter your comment"
            rows={4}
            value={formData.comment}
            onChange={handleChange}
          />
        </label>

        {/* Submit */}
        <button type="submit">Submit</button>

      </form>
    </div>
  );
}
