import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = hubDatabase();

  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, trainers TEXT, token TEXT)`
  );
  /*const user = db
    .prepare("SELECT * FROM users WHERE email = ?1")
    .bind(body.email)
    .first();
    */
  const user = await db
    .prepare("SELECT * FROM users WHERE email = ?1")
    .bind(body.email)
    .first();
  // Check if user exists
  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Server says no",
    });

  // Check password
  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid)
    throw createError({
      statusCode: 401,
      statusMessage: "Access denied",
    });

  // Create token
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  // Set cookie
  setCookie(event, "askew_token", token);

  // Save token on user
  await db
    .prepare("UPDATE users SET token = ?1 WHERE id = ?2")
    .bind(token, user.id)
    .run();

  // Return
  let strippedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    trainers: user.trainers,
  };

  return {
    token: token,
    user: strippedUser,
  };
});

/*function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}*/
