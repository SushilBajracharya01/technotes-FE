import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../app/auth/authSlice";
import { useRefreshMutation } from "../../app/auth/authApiSlice";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";

function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  //isUninitialized : refresh function has not been called yet.
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifyRefreshToken");

        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (!persist) {
    console.log("No persist");
    content = <Outlet />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    console.log("error");
    content = (
      <p>
        <Link to="/login">Please Login again</Link>
        <ErrorAlert message={error?.data?.message} />
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token uninitialized");
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin;
