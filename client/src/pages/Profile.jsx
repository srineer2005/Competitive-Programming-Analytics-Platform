import { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import ProfileForm from "../components/Profile/ProfileForm";

import "../styles/Profile.css";

import { getProfile } from "../services/profile.service";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [statistics, setStatistics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();

                setProfile(response.data.user);
                setStatistics(response.data.statistics);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading || !profile || !statistics) {
        return (
            <Layout>
                <h2>Loading...</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="profile-page">
                <h1>My Profile</h1>

                <ProfileForm
                    profile={profile}
                    statistics={statistics}
                    setProfile={setProfile}
                />
            </div>
        </Layout>
    );
}

export default Profile;