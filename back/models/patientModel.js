const { Pool } = require('pg');

// Create a pool instance for connecting to your PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use your Heroku Postgres connection string
});

// Patient model
class Patient {
  constructor(id, name, age, hospitalId) {
    this.id = id;
    this.name = name;
    this.age = age; // Add other relevant fields
    this.hospitalId = hospitalId;
  }

  // Method to create a patient
  static async create(name, age, hospitalId) {
    const result = await pool.query(
      'INSERT INTO patients (name, age, hospital_id) VALUES ($1, $2, $3) RETURNING *',
      [name, age, hospitalId]
    );
    return new Patient(result.rows[0].id, result.rows[0].name, result.rows[0].age, result.rows[0].hospital_id);
  }

  // Method to find a patient by ID
  static async findById(id) {
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return new Patient(result.rows[0].id, result.rows[0].name, result.rows[0].age, result.rows[0].hospital_id);
  }

  // Method to update a patient
  static async update(id, name, age) {
    const result = await pool.query(
      'UPDATE patients SET name = $1, age = $2 WHERE id = $3 RETURNING *',
      [name, age, id]
    );
    return new Patient(result.rows[0].id, result.rows[0].name, result.rows[0].age, result.rows[0].hospital_id);
  }

  // Method to delete a patient
  static async delete(id) {
    await pool.query('DELETE FROM patients WHERE id = $1', [id]);
  }
}

module.exports = Patient;