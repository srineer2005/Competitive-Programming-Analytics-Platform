import { useEffect, useState } from "react";

import {
    getCodingProfiles,
    updateCodingProfiles,
} from "../../services/user.service";

import "./CodingProfilesForm.css";

function CodingProfilesForm() {
  const [formData, setFormData] = useState({
    codeforces: "",
    leetcode: "",
    codechef: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchProfiles = async () => {
        try {
            const response = await getCodingProfiles();

            setFormData({
                codeforces: response.data.codeforces || "",
                leetcode: response.data.leetcode || "",
                codechef: response.data.codechef || "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    fetchProfiles();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateCodingProfiles(formData);

      setMessage("Coding profiles updated successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className="coding-profiles-card">
      <h2>Coding Profiles</h2>

      <form onSubmit={handleSubmit}>
        <label>Codeforces</label>

        <input
          type="text"
          name="codeforces"
          value={formData.codeforces}
          onChange={handleChange}
          placeholder="Enter Codeforces handle"
        />

        <label>LeetCode</label>

        <input
          type="text"
          name="leetcode"
          value={formData.leetcode}
          onChange={handleChange}
          placeholder="Enter LeetCode handle"
        />

        <label>CodeChef</label>

        <input
          type="text"
          name="codechef"
          value={formData.codechef}
          onChange={handleChange}
          placeholder="Enter CodeChef handle"
        />

        <button type="submit">
          Save Profiles
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CodingProfilesForm;