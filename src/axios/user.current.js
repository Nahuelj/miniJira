import axios from "axios";

export async function getUserCurrent() {
  const res = await axios.get("http://localhost:3000/api/user/current");
  console.log(res);
  return res;
}
