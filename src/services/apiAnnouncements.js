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
