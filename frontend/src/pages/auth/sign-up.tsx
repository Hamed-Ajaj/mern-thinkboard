import { useState, type FormEvent } from "react";
import { signUp } from "../../lib/auth-client";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await signUp.email({
        name: name,
        email: email,
        password: password,
      });
      console.log(data);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="name"
          placeholder="full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">sign up</button>
      </form>
    </>
  );
};

export default SignUpPage;
