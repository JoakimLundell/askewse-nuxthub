import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = hubDatabase();
  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, trainers TEXT, token TEXT)`
  );

  const exist = await db
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(body.email)
    .first();
  if (exist)
    throw createError({
      statusCode: 400,
      statusMessage: "User already exist",
    });

  // Hash password
  const hashed = await bcrypt.hash(body.password, 9);

  // Save user
  const user = await db
    .prepare(
      `INSERT INTO users (Name, Email, Password) VALUES (?1, ?2, ?3) RETURNING ID`
    )
    .bind(body.name, body.email, hashed)
    .run();
  const userId = user.results[0].id;

  if (!user.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed adding to db",
    });
  }

  // Create token
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  // Set cookie
  setCookie(event, "askew_token", token);

  // Save token on user
  await db
    .prepare("UPDATE users SET token = ?1 WHERE id = ?2")
    .bind(token, userId)
    .run();

  return {
    token: token,
    user: {
      id: userId,
      name: body.name,
      email: body.email,
      trainers: null,
    },
  };

  return user;
});
