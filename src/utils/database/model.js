
export const fetchUser = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user LIMIT 1;',
      [],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          callback(_array[0])
        } else {
          callback(null)
        }
      },
      (_, error) => console.error('Error fetching user', error)
    )
  })
}

export const addUser = (username, token, callback) => {
  fetchUser(existingUser => {
    if (existingUser) {
      console.warn('User already exists')
      callback()
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO user (username, token) VALUES (?, ?);',
          [username, token],
          () => callback(),
          (_, error) => console.error('Error adding user', error)
        )
      })
    }
  })
}

export const updateUser = (token, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE user SET token=? LIMIT 1;',
      [token],
      () => callback(),
      (_, error) => console.error('Error updating user', error)
    )
  })
}