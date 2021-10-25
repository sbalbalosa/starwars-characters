import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  AppBar,
  Toolbar,
  Typography,
  ToggleButton,
  Button,
} from "@mui/material";

interface Props {
  hasFilters: boolean;
  filterSelected: boolean;
  onToggleFilter: (filterSelected: boolean) => void;
  onClearFilters: () => void;
}

export default function Header({
  filterSelected,
  onToggleFilter,
  onClearFilters,
  hasFilters,
}: Props) {
  return (
    <AppBar position="sticky" role="banner">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#FFE81F" }}
        >
          Star Wars
        </Typography>
        {hasFilters && (
          <Button
            variant="contained"
            color="secondary"
            onClick={onClearFilters}
            sx={{ marginRight: 1 }}
            aria-label="Clear filter"
          >
            Clear Filter
          </Button>
        )}
        <ToggleButton
          size="small"
          value="check"
          aria-label="Filter toggle"
          selected={filterSelected}
          onChange={() => onToggleFilter(!filterSelected)}
        >
          <FilterListRoundedIcon sx={{ color: "#fff" }} />
        </ToggleButton>
      </Toolbar>
    </AppBar>
  );
}
