import supabase from "../config/supabaseClient.js";

export async function getProgramList() {
  const { data, error } = await supabase.from("Programs").select(`
   ProgramName,
   ProgramCode,
   ProgramNo
  `);

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load programs");
  }

  return data;
}

export async function getProgramById(programNo) {
  const { ID } = programNo;
  const { data, error } = await supabase.from("Programs").select(`
        ProgramName,
        ProgramCode,
        ProgramNo   
    `).eq("ProgramNo", programNo)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load program");
  }

  return data;
}
