// MUI
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// component props type
type BreadCrumbProps = { labels: { title: string }[] };

function CustomBreadcrumb({ labels }: BreadCrumbProps) {
  const breadcrumbs = [
    <Link color="inherit" to="/">
      Home
    </Link>,
    labels.map((label, index) => (
      <Typography color="text.primary" key={index}>
        {label.title}
      </Typography>
    )),
  ];
  return (
    <Breadcrumbs separator="›" sx={{ marginTop: 4 }}>
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumb;
