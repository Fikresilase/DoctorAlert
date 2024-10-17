const { Pool } = require('pg');

// Create a pool instance for connecting to your PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use your Heroku Postgres connection string
});

// Hospital model
class Hospital {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Store hashed password
  }

  // Method to create a hospital
  static async create(name, email, password) {
    const result = await pool.query(
      'INSERT INTO hospitals (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password] // Password should be hashed before saving
    );
    return new Hospital(result.rows[0].id, result.rows[0].name, result.rows[0].email, result.rows[0].password);
  }

  // Method to find a hospital by email
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM hospitals WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    return new Hospital(result.rows[0].id, result.rows[0].name, result.rows[0].email, result.rows[0].password);
  }

  // Method to update a hospital
  static async update(id, name, email) {
    const result = await pool.query(
      'UPDATE hospitals SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return new Hospital(result.rows[0].id, result.rows[0].name, result.rows[0].email, result.rows[0].password);
  }

  // Method to delete a hospital
  static async delete(id) {
    await pool.query('DELETE FROM hospitals WHERE id = $1', [id]);
  }
}

module.exports = Hospital;