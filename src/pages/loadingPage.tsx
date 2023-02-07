interface LoadingPageProps {}

const LoadingPage = (props: LoadingPageProps) => {
  return (
    <div className="flex-wrapper-center">
      <div className="loading-page">
        <span className="loading-page-letter">L</span>
        <span className="loading-page-letter">O</span>
        <span className="loading-page-letter">A</span>
        <span className="loading-page-letter">D</span>
        <span className="loading-page-letter">I</span>
        <span className="loading-page-letter">N</span>
        <span className="loading-page-letter">G</span>
        <span className="loading-page-letter">.</span>
        <span className="loading-page-letter">.</span>
        <span className="loading-page-letter">.</span>
      </div>
    </div>
  );
};

export default LoadingPage;
