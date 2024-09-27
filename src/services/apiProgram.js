import supabase from "../config/supabaseClient.js";

export async function getProgramList() {
  const { data, error } = await supabase.from("Programs").select(`
   ProgramName,
   ProgramCode
  `);

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load programs");
  }

  return data;
}

export async function getProgram({ params }) {
 
  const { ID } = params;
  const { data, error } = await supabase.from("Programs").select(`
        ProgramName,
        ProgramCode     
    `).eq("ProgramNo", ID)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load program");
  }

  return data;
}
