import { Link, useNavigate } from "react-router-dom";
import s from "./SomethingWentWrong.module.scss";
import { TbHomeCancel } from "react-icons/tb";

const ErrorPage = () => {

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    }
  return (
    <div className={s.pageContainer}>
      <div className={`${s.errorContainer} `}>
        <h1 className={`${s.errorCode}`} ><TbHomeCancel /></h1>

        <p className={s.errorInfo}>
            This Page Isn't Available
          </p>

        <p className={s.errorHelp}>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
        </p>

        {/* <Button label={"Refresh page"} size="large" primary backgroundColor="#E5E5E5" color="black" width={width > 650 ? '50%' : '100%'} onClick={resetErrorBoundary} /> */}
        <button className={s["cta-button"]} onClick={handleRedirect}>
          Back to Home
        </button>

        {/* <Link to="/" onClick={() => window.location.href = '/'}>
          <span className={`${s.errorBtn}`} color="secondary-red">
            Back to Home
          </span>

        </Link>
        <Link to="/" onClick={() => window.location.href = '/'}>
          <span className={`${s.errorBtn}`} color="secondary-red">
            Visit Help Center
          </span>
        </Link> */}
      </div>
    </div>
  );
}

export default ErrorPage;
