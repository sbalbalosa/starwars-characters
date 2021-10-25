import { Drawer, Button, Typography, Stack, Divider } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box } from "@mui/system";

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function FilterDrawer({ open, onClose, children }: Props) {
  return (
    <Drawer anchor="right" open={open} aria-label="Filter options">
      <Box mx={2} mt={2} mb={5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" component="h4" sx={{ ml: 2 }}>
            Filters
          </Typography>
          <Button onClick={onClose}>
            <CancelOutlinedIcon />
          </Button>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        {children}
      </Box>
    </Drawer>
  );
}
