import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  // Get user id
  /*const id = event.context.id;
  if (id) {
    // Remove token from db
    const db = hubDatabase();
    await db
      .prepare("UPDATE users SET token = null WHERE id = ?1")
      .bind(id)
      .run();
  }
  // Remove cookie
  setCookie(event, "askew_token", null);
  // Return
  return { success: true };*/
});
