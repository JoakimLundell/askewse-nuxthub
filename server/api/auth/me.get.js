import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  // Get current users id

  const id = event.context.id;
  if (!id) return { user: {} };

  // Get user
  const db = hubDatabase();

  const user = await db
    .prepare(`SELECT id, name, email, trainers FROM users WHERE id = ?1`)
    .bind(id)
    .first();

  // Return
  return { user: user };
});
