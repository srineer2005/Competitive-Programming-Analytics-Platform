import { useEffect, useRef, useState } from "react";

import ProfileStatistics from "./ProfileStatistics";
import { updateProfile } from "../../services/profile.service";

function ProfileForm({
    profile,
    statistics,
    setProfile,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);
    const [saving, setSaving] = useState(false);
    const editFormRef = useRef(null);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);

    setTimeout(() => {
        editFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, 100);
};

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await updateProfile(formData);

            setProfile(response.data);
            setIsEditing(false);

            alert("Profile updated successfully.");
        } catch (error) {
            console.error("Profile update error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
    ref={editFormRef}
    className="profile-form"
>

            {/* ---------------- Personal Information ---------------- */}

            <section className="profile-section">
                <h2>Personal Information</h2>

                <div className="profile-grid">

                    <div>
                        <label>Name</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.name || "Not provided"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Email</label>

                        <p className="profile-value profile-readonly">
                            {profile.email || "Not provided"}
                        </p>
                    </div>

                    <div>
                        <label>Country</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.country || "Not provided"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>State</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="state"
                                value={formData.state || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.state || "Not provided"}
                            </p>
                        )}
                    </div>

                </div>
            </section>


            {/* ---------------- Academic Information ---------------- */}

            <section className="profile-section">
                <h2>Academic Information</h2>

                <div className="profile-grid">

                    <div>
                        <label>University</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="university"
                                value={formData.university || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.university || "Not provided"}
                            </p>
                        )}
                    </div>

                </div>
            </section>


            {/* ---------------- Coding Profiles ---------------- */}

            <section className="profile-section">
                <h2>Coding Profiles</h2>

                <div className="profile-grid">

                    <div>
                        <label>Codeforces</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="codeforces"
                                value={formData.codeforces || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.codeforces || "Not connected"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>LeetCode</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="leetcode"
                                value={formData.leetcode || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.leetcode || "Not connected"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>CodeChef</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="codechef"
                                value={formData.codechef || ""}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="profile-value">
                                {profile.codechef || "Not connected"}
                            </p>
                        )}
                    </div>

                </div>
            </section>


            {/* ---------------- Platform Statistics ---------------- */}

            <ProfileStatistics
                statistics={statistics}
            />


            {/* ---------------- Edit / Save / Cancel ---------------- */}

            <div className="profile-actions">

                {!isEditing ? (
                    <button
                        type="button"
                        className="profile-edit-btn"
                        onClick={handleEdit}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="profile-cancel-btn"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="profile-save-btn"
                            onClick={handleSubmit}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}

export default ProfileForm;