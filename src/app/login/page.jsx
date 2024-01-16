"use client";
import { useState } from "react";
import '../globals.css'

function MyFormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aquí puedes hacer la petición HTTP
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    
    <>
    
    {/* 
    
    
    
     <form className="" onSubmit={handleSubmit}>
       <label>
         Email:
         <input className=""
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
       </label>
       <label>
         Password:
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
       </label>
       <button type="submit">Register</button>
     </form>
    
    
    */}



    <div className="bg-gray-100 flex items-center justify-center h-screen">
    <div className="bg-[#0E0E0E]  p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
            </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Login</h2>
        <p className="text-white text-center mb-6">   Ingresa tus datos para loguearte..</p>
        <form onSubmit={handleSubmit}>
      
            <div className="mb-4">
            
                <label for="email" className="block text-white text-sm font-semibold mb-2">Email  *</label>
                <input id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="TuCorreo@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                
                />
            </div>
            <div className="mb-6">
                <label for="password" className="block text-white text-sm font-semibold mb-2">Password *</label>
                <input type="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                />
             
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
            <p className="text-gray-600 text-xs text-center mt-4">
              
                <a href="#" className="text-blue-500 hover:underline">Terminos y condiciones</a>.
            </p>
        </form>
    </div>
</div>


  
    
    </>

  );
}

export default MyFormLogin;
