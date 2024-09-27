import React, { useState } from 'react';
import { supabase } from '.../config/supabaseClient.js';



const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    isAdmin: false,
    address: '',
    dob: '',
    phone: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Users') // 'users' is the table name
        .insert([
          {
            UserName: formData.username,
            PasswordHash: formData.password,
            Email: formData.email,
            IsAdmin: formData.isAdmin,
            HomeAddress: formData.address,
            DateOfBirth: formData.dob,
            PhoneNumber: formData.phone,
            FirstName: formData.firstName,
            lastName: formData.lastName
          }
        ]);

      if (error) {
        console.error('Error uploading data:', error);
      } else {
        console.log('Data uploaded successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Is Admin:</label>
        <input
          type="checkbox"
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;