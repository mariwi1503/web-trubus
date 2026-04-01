import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://jtfegqxkdydjszewnamk.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZkNjE5YjJlLTU1MDAtNDZiYS05MDAyLTRiZDI2MmM4MzM1YiJ9.eyJwcm9qZWN0SWQiOiJqdGZlZ3F4a2R5ZGpzemV3bmFtayIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1MDA1NzA4LCJleHAiOjIwOTAzNjU3MDgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.hd6SISV4ElucQ6ZXIK8rWaIuWzCNbJSr4nlH0vvwrrg';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };