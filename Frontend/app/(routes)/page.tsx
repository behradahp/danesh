"use client";
import axios from "axios";

export default function Home() {
  const handleUpdate = async () => {
    const data = new FormData();
    data.append("first_name", "behrad");
    const res = await axios.patch("http://127.0.0.1:8000/auth/updateUser/1/", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(res.data)
  };
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <button onClick={handleUpdate}>update</button>
    </div>
  );
}
