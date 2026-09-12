import Layout from "../components/Layout/Layout";
import CodingProfilesForm from "../components/Forms/CodingProfilesForm";

function CodingProfiles() {
  return (
    <Layout>
      <h1>Coding Profiles</h1>

      <p>
        Connect your coding platform accounts to view analytics,
        ratings and contest history.
      </p>

      <CodingProfilesForm />
    </Layout>
  );
}

export default CodingProfiles;