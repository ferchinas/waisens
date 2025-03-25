
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zubrkvvgctjthednnnpl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YnJrdnZnY3RqdGhlZG5ubnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzQ0NjUsImV4cCI6MjA1ODQxMDQ2NX0.D9qnWw_fWAA67o7ISDnOqQH0apbg8nxkLm3ukCVD4io'

export const supabase = createClient(supabaseUrl, supabaseKey)
