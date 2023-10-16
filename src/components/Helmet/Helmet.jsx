const Helmet = ({ title, children }) => {
  document.title = "SupaMart - " + title;
  return <div className="w-full">{children}</div>;
};

export default Helmet;
