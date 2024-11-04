import supabase from "../config/supabaseClient.js";

export async function getSchoolInformation() {
  const { data, error } = await supabase.from("School").select("*");
  console.log("API getSchoolInformation", data);
  if (error) {
    console.error(error);
    throw new Error("Fail to get main contact from school table!~");
  }

  return data.length > 0 ? data[0] : null;
}

export async function updateSchoolInformation(schoolID, updatedData) {
  const { data, error } = await supabase
    .from("School")
    .update(updatedData)
    .eq("SchoolID", schoolID)
    .select();

  console.log("API update school info", data);
  if (error) {
    console.error("Error updating school information:", error);
    throw new Error("Failed to update school information.");
  }

  return data;
}
