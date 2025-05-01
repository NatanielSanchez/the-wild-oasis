import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kvaakupgmmwoicvzbeyt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YWFrdXBnbW13b2ljdnpiZXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjcxOTAsImV4cCI6MjA1Njk0MzE5MH0.DJknNmqyVtcslpuklWU2wFktJnXcTSgieLXf1n8_pqU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
