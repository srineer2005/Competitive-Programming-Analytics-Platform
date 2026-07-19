import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      alert(JSON.stringify(response, null, 2));

      console.log(response);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;