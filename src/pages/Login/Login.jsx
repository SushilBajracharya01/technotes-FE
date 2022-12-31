import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/auth/authApiSlice";
import { setCredentials } from "../../app/auth/authSlice";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import usePersist from "../../hooks/usePersist";

/**
 *
 */
export default function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  if (isLoading) return <Loading />;

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      console.log(err);
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="sm:mx-auto w-5/6 sm:max-w-md bg-white  py-8 px-4 shadow rounded-lg sm:px-10 ">
        <h1 className="text-3xl md:text-4xl mb-8 font-bold text-slate-800">
          Employee Login
        </h1>

        <main>
          <ErrorAlert innerRef={errRef} message={errMsg} />

          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <div className="mt-2">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={onUsernameChanged}
                  autoComplete="off"
                  required
                  inputRef={userRef}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="mt-2">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={onPasswordChanged}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                label={"Sign in"}
                variant="primary"
                className="w-full justify-center"
              />
            </div>

            <label className="block mt-4">
              <input
                type="checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />{" "}
              Trust this computer
            </label>
          </form>
        </main>

        <footer className="mt-8">
          <Link
            to="/"
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            Back to Home
          </Link>
        </footer>
      </section>
    </div>
  );
}
