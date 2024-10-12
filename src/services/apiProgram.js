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

export async function updateProgram(updatedData) {
  console.log('updatedData' + JSON.stringify(updatedData));
  const { ProgramNo, ...updateFields } = updatedData;
  const { data, error } = await supabase.from("Programs")
  .update({
    ProgramName: updatedData.ProgramName,
    ProgramCode: updatedData.ProgramCode
  })
  .eq("ProgramNo", updatedData.ProgramNo);
  if (error) {
    console.error(error);
    throw new Error("Failed to update program");
  }
  return data;
}

export async function addProgram(programData) {
  const { data, error } = await supabase.from("Programs")
    .insert([programData]);

  if (error) {
    console.error(error);
    throw new Error("Failed to add program");
  }
  return data;
}
