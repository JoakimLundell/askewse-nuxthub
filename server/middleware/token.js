import jwt from "jsonwebtoken";
export default defineEventHandler((event) => {
  // Get auth cookie
  const cookies = parseCookies(event);
  const token = cookies?.askew_token;
  const guestToken = cookies?.askew_guest_token;

  // Decode token
  if (token && token !== undefined) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      event.context.id = decoded.id;
    } catch (error) {
      // Token expired
      event.context.id = null;
      setCookie(event, "token", null);
    }
  }

  if (guestToken && guestToken !== undefined) {
    // No token set id for guest
    event.context.guest = guestToken;
  } else {
    // No guest token, get one
    const id = "1000" + Math.floor(Math.random() * 1000);
    setCookie(event, "askew_guest_token", id, {
      maxAge: new Date().setDate(new Date().getDate() - 1),
    });
    event.context.guest = id;
  }
});
