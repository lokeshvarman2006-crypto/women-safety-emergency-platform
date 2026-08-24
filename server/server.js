require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbReady = await connectDB();
  app.locals.dbReady = dbReady;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    if (!dbReady) {
      console.log(
        "Database features are currently unavailable, but the server is running."
      );
    }
  });
};

startServer();