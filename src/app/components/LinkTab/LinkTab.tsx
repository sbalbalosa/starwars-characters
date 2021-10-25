import { Tab } from "@mui/material";

interface LinkTabProps {
  label: string;
  href: string;
  onLinkSelect: (href: string) => void;
}

export default function LinkTab(props: LinkTabProps): JSX.Element {
  const { onLinkSelect, ...restProps } = props;
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        onLinkSelect(restProps.href);
      }}
      {...restProps}
    />
  );
}
