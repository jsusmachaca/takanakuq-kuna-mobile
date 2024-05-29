const initDatabase = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medicine_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        hours INTEGER NOT NULL,
        days INTEGER NOT NULL
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        token TEXT NOT NULL,
        medicine_id INTEGER,
        FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
      );
    `)
  } catch (error) {
    console.error('Error during database initialization:', error)
    throw error
  }
}

export default initDatabase
