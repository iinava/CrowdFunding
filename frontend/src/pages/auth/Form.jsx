import { useContext, useState } from "react";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../lib/constants";
import { Button, Input } from "@nextui-org/react";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password ,email});
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="w-[350px]  sm:w-[400px] p-5  flex flex-col gap-5 items-center justify-center">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p>Enter ypur personal details to create an account</p>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="flat"
          label="username"
          placeholder="Enter your username"
        />
        {method === "register" &&
         <Input
         type="text"
         value={email}
         onChange={(e) => setemail(e.target.value)}
         variant="flat"
         label="email"
         placeholder="Enter your email  address"
       />
        }
        <Input
          className="form-input py-3"
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
     
        <Button className="form-button w-full" type="submit">
          {loading ? "Loading..." : <>{name}</>}
        </Button>
       

        {
          method === "register" ?  <p>
          Already have an account? <a className="text-blue-300 hover:text-orange-400" href="/login">Login</a>
        </p> :  <p>
          dont  have an account yet? <a href="/register" className="text-blue-300 hover:text-orange-400">Register now</a>
        </p>
        }
      </div>
    </form>
  );
}

export default Form;
