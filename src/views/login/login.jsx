import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../../../api/login/login_auth";
import logo from "../../assets/images/logo.png"
import backgroundImage from "../../assets/images/login_page_bk.jpg"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validate inputs
        if (!username) {
            setUsernameError("Username is required");
            return;
        }
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
    
        // Clear previous errors
        setUsernameError("");
        setPasswordError("");
    
        try {
            setStatus();
            setLoading(true);
            let result = await verifyLogin(username, password);
    
            console.log("Login result:", result);
    
            if (result.success) {
                localStorage.setItem('authToken', result.token); // Store the token from response
                console.log("Navigating to /dashboard");
                setStatus("User is logged in");
                navigate("/dashboard", {replace: true});
            } else {
                setStatus("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setStatus("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-green-900 lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img 
                    src={backgroundImage} 
                    alt={backgroundImage} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <div className="text-center">
                        <img width="210" src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
                        Starestate Log In to your account
                    </h1>
                    <form className="mt-6" id="logform" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder="Enter Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
                                autoFocus
                            />
                            {usernameError && <span className="text-red-500 text-sm">{usernameError}</span>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Enter Password" 
                                minLength="6"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
                            />
                            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>
                    <span className="text-red-500 text-center block mt-4">{status}</span>
                </div>
            </div>
        </section>
    );
}


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { verifyLogin } from "../../../api/login/login_auth";

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [status, setStatus] = useState("");
//     const [usernameError, setUsernameError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Validate inputs
//         if (!username) {
//             setUsernameError("Username is required");
//             return;
//         }
//         if (!password) {
//             setPasswordError("Password is required");
//             return;
//         }

//         // Clear previous errors
//         setUsernameError("");
//         setPasswordError("");

//         try {
//             setLoading(true);
//             let result = await verifyLogin(username, password);

//             // Handle response
//             if (result.success) {
//                 setStatus("User is logged in");
//                 navigate("/dashboard");
//             } else {
//                 setStatus("Login failed");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             setStatus("An error occurred during login");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="flex flex-col md:flex-row h-screen items-center">
//             <div className="bg-green-900 lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
//                 <img 
//                     src="src/assets/images/login_page_bk.jpg" 
//                     alt="Background_Login" 
//                     className="w-full h-full object-cover"
//                 />
//             </div>
//             <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
//                 <div className="w-full max-w-sm">
//                     <div className="text-center">
//                         <img width="210" src="src/assets/images/logo.png" alt="Logo" />
//                     </div>
//                     <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
//                         Starestate Log In to your account
//                     </h1>
//                     <form className="mt-6" id="logform" onSubmit={handleSubmit}>
//                         <div>
//                             <label className="block text-gray-700">Username</label>
//                             <input 
//                                 type="text" 
//                                 name="username" 
//                                 id="username" 
//                                 placeholder="Enter Username" 
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)} 
//                                 className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
//                                 autoFocus
//                             />
//                             {usernameError && <span className="text-red-500 text-sm">{usernameError}</span>}
//                         </div>
//                         <div className="mt-4">
//                             <label className="block text-gray-700">Password</label>
//                             <input 
//                                 type="password" 
//                                 name="password" 
//                                 id="password" 
//                                 placeholder="Enter Password" 
//                                 minLength="6"  
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
//                             />
//                             {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
//                         </div>
//                         <button 
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                         >
//                             {loading ? "Logging in..." : "Log In"}
//                         </button>
//                     </form>
//                     <span className="text-red-500 text-center block mt-4">{status}</span>
//                 </div>
//             </div>
//         </section>
//     );
// }



 // <div className="container">
        //     <div className="center verticle_center full_height">
        //         <div className="login_section">
        //             <div className="logo_login">
        //                 <div className="center">
        //                     <img width="210" src="src/assets/images/logo.png" alt="Logo" />
        //                 </div>
        //             </div>
        //             <div className="login_form text-center">
        //                 <form id="logform" onSubmit={handleSubmit}>
        //                     <span className="text-danger mb-2 mx-auto">{status}</span>
        //                     <fieldset>
        //                         <div className="field">
        //                             <label className="label_field" htmlFor="username">
        //                                 Username
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="username"
        //                                 placeholder="Username"
        //                                 value={username}
        //                                 onChange={(e) => setUsername(e.target.value)}
        //                                 required
        //                             />
        //                             <span className="field_error text-danger d-block">
        //                                 {usernameError}
        //                             </span>
        //                         </div>
        //                         <div className="field">
        //                             <label className="label_field" htmlFor="password">
        //                                 Password
        //                             </label>
        //                             <input
        //                                 type="password"
        //                                 id="password"
        //                                 placeholder="Password"
        //                                 value={password}
        //                                 onChange={(e) => setPassword(e.target.value)}
        //                                 required
        //                             />
        //                             <span className="field_error text-danger d-block">
        //                                 {passwordError}
        //                             </span>
        //                         </div>
        //                         <div className="field margin_0">
        //                             <button className="main_bt" type="submit">
        //                                 Log In
        //                             </button>
        //                         </div>
        //                     </fieldset>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>