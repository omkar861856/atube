import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

// Cache the connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  if (global._mongooseConn) {
    return global._mongooseConn;
  }
  global._mongooseConn = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });
  return global._mongooseConn;
}

export default connectDB;
