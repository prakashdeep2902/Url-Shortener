import mongoose from "mongoose";

async function ConnectTOmongodbLocal(urlOfconnection) {
  return await mongoose.connect(urlOfconnection);
}

export default ConnectTOmongodbLocal;
