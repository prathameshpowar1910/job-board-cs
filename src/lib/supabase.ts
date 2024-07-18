import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getJobs() {
  console.log('Fetching jobs...');
  
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .not('status', 'eq', 'Closed')
      .order('date', { ascending: false , nullsFirst: true})
      .limit(1000); // Adjust this limit as needed

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    console.log('Fetched jobs:', data?.length || 0);
    // console.log('Sample job:', data ? data[0] : 'No jobs');

    // Additional logging to check status distribution
    const statusCounts = data?.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
    console.log('Status distribution:', statusCounts);

    return data || [];
  } catch (e) {
    console.error('Exception in getJobs:', e);
    return [];
  }
}