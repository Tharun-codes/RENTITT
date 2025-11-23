export default function errorHandler(err, req, res, next) {
  console.error("🔥 BACKEND ERROR:");

  console.error(err);

  res.status(500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}
