// Supabase dataset storage integration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://elnmqleoitmkuqlhscvk.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Upload training image to Supabase Storage
async function uploadTrainingImage(file, category, filename) {
  try {
    // Upload to storage bucket
    const { data, error } = await supabase.storage
      .from('training-images')
      .upload(`${category}/${filename}`, file);

    if (error) throw error;

    // Store metadata in database
    const { error: dbError } = await supabase
      .from('training_dataset')
      .insert({
        category,
        filename,
        storage_path: data.path,
        created_at: new Date().toISOString()
      });

    if (dbError) throw dbError;
    
    console.log(`Uploaded: ${category}/${filename}`);
    return data.path;
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// Get all training images for a category
async function getTrainingImages(category) {
  const { data, error } = await supabase
    .from('training_dataset')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Fetch failed:', error);
    return [];
  }

  return data;
}

// Create training dataset table
async function createTrainingTable() {
  const { error } = await supabase.rpc('create_training_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS training_dataset (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        storage_path VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `
  });

  if (error) console.error('Table creation failed:', error);
  else console.log('Training dataset table ready');
}

module.exports = {
  uploadTrainingImage,
  getTrainingImages,
  createTrainingTable
};