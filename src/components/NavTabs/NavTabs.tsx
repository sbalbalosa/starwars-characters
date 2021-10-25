import { Box, Tabs } from "@mui/material";

interface Props {
  value: number;
  children: React.ReactNode;
}

export default function NavTabs({ value, children }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} aria-label="Character tabs">
        {children}
      </Tabs>
    </Box>
  );
}
