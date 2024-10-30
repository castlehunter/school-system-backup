import supabase from "../config/supabaseClient.js";

export async function getProgramList() {
  const { data, error } = await supabase.from("Programs").select(`
   ProgramName,
   ProgramCode,
   ProgramNo,
   ProgramID
  `);

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load programs");
  }

  return data;
}

export async function getProgramByCode(programCode) {
  const { data, error } = await supabase
    .from("Programs")
    .select(
      `
        ProgramCode,
        ProgramName,
        ProgramDescription,
        ProgramID  
    `
    )
    .eq("ProgramCode", programCode)
    .single();

  console.log("API getProgramByCode", data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load program");
  }

  return data;
}

export async function updateProgram(updatedData) {
  // console.log("updatedData" + JSON.stringify(updatedData));
  const { data, error } = await supabase
    .from("Programs")
    .update({
      ProgramCode: updatedData.ProgramCode,
      ProgramName: updatedData.ProgramName,
      ProgramDescription: updatedData.ProgramDescription,
    })
    .eq("ProgramCode", updatedData.ProgramCode)
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Failed to update program");
  }
  return data;
}

export async function addProgram(programData) {
  const { data, error } = await supabase.from("Programs").insert([programData]);

  if (error) {
    console.error(error);
    throw new Error("Failed to add program");
  }
  return data;
}
