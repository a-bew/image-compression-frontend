import NotFoundImage from '../../assets/writer.svg';
import styles from './error_page.module.scss';

const ErrorPage = ({ error, resetErrorBoundary }:{error:Error, resetErrorBoundary:()=>void}) => {
    console.log('Error occured', error);
    return (
      <div className={styles['error-page']}>
        <img src={NotFoundImage} alt='Page not found' />
        <p className='error-msg'>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
          <button className='btn' onClick={resetErrorBoundary}>
            Refresh page
          </button>
        </p>
      </div>
    );
  };

export default ErrorPage;