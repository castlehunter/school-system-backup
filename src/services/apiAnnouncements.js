import supabase from "../config/supabaseClient.js";

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("Announcements")
    .select("*")
    .order("CreatedAt", { ascending: false });

  console.log("API fetchAnnouncements", data);
  if (error) console.error("Error fetching announcements:", error);
  return data;
}

export async function addAnnouncement(newData) {
  const { Title, Content, CreatedAt, UserID } = newData;
  const { data, error } = await supabase.from("Announcements").insert([
    {
      Title,
      Content,
      CreatedAt,
      UserID,
    },
  ]);

  if (error) console.error("Error adding announcement:", error);
  return data;
}

export async function getAnnouncementById(id) {
  const { data, error } = await supabase
    .from("Announcements")
    .select("*")
    .eq("Id", id)
    .single();

  if (error) {
    console.error("Error fetching announcement by ID:", error);
    return null;
  }
  return data;
}

// services/apiAnnouncements.js
export async function updateAnnouncement(updatedAnnouncement) {
  const { data, error } = await supabase
    .from("Announcements")
    .update(updatedAnnouncement)
    .eq("Id", updatedAnnouncement.Id)
    .select();

  if (error) {
    console.error("Error updating announcement:", error);
    return null;
  }
  return data[0]; // Assuming the response is an array with a single updated record
}
