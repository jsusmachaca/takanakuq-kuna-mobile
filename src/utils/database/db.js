const initDatabase = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        medicine_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        hours INTEGER NOT NULL,
        days INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        token TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL,
        is_staff BOOLEAN NOT NULL
      );
    `)
  } catch (error) {
    console.error('Error during database initialization:', error)
    throw error
  }
}

export default initDatabase
