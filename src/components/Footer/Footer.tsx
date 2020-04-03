import React from "react";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="page-footer font-small   bg-primary ">
      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="https://github.com/hudsonfranca">github.com/hudsonfranca</a>
      </div>
    </footer>
  );
};

export default Footer;
