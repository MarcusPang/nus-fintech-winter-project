import { useRouter } from "next/router";
import { Nav, NavLinkProps } from "react-bootstrap";

const CustomNavLink = ({ href, ...rest }: NavLinkProps) => {
  const router = useRouter();
  return (
    <Nav.Link
      href={href}
      {...rest}
      style={{
        color: "black",
      }}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    ></Nav.Link>
  );
};

export default CustomNavLink;
