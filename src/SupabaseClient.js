import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);

export async function addReading(measurement) {
  const { error } = await supabase
    .from("readings")
    .insert([measurement])
    .select("*");
  if (error) return <div>failed to add data</div>;
}

export async function deleteData(reading) {
  const { error } = await supabase
    .from("readings")
    .delete()
    .match({ id: reading.id });

  if (error) return <div>failed to delete data</div>;
}

export async function getReadings() {
  const { data, error } = await supabase.from("readings").select("*");
  if (error) return <div>failed to get data</div>;
  return data;
}
