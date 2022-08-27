import { SpinnerDotted } from 'spinners-react';

const LoadingScreen = () => {
  return (
    <div
      className="position-absolute top-50 start-50 translate-middle "
      aria-label="loading screen"
    >
      <div className="d-flex justify-content-center">
        {' '}
        <SpinnerDotted size={320} color={'white'} speed={150} />
      </div>
    </div>
  );
};

export default LoadingScreen;
