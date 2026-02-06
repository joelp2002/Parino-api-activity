const dns = require('dns');
const mongoose = require('mongoose');

//public DNS servers for c-ares (Node's DNS resolver)
//This helps when the system resolver blocks SRV lookups used by mongodb+srv
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    // This tries to connect using the Key in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, it prints the host name
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, it shows the error and stops the server
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
