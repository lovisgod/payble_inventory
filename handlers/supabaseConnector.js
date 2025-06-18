const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase URL and Key must be provided in environment variables.');
}

// Singleton pattern for Supabase client
let supabaseInstance;

function getSupabaseClient() {
    if (!supabaseInstance) {
        supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return supabaseInstance;
}

module.exports = getSupabaseClient();