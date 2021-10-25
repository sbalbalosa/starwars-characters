import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  toggleFilm,
  selectAllFilms,
  selectFilms,
  selectDirectFilters,
  setDirectFilter,
} from "./filtersSlice";
import TheatersIcon from "@mui/icons-material/Theaters";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function Filters() {
  const films = useAppSelector(selectAllFilms);
  const filmsFilter = useAppSelector(selectFilms);
  const directFilters = useAppSelector(selectDirectFilters);
  const dispatch = useAppDispatch();

  const handleChangeDirectFilter = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    type Selected = Parameters<typeof setDirectFilter>[0][0];
    dispatch(setDirectFilter([name as Selected, value]));
  };

  return (
    <Box display="flex" justifyContent="center" maxWidth={500} minWidth={300}>
      <Stack spacing={4} sx={{ width: "90%" }}>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center">
            <TheatersIcon />
            <Typography variant="h5" component="h5" marginLeft={1}>
              Films
            </Typography>
          </Stack>
          <Stack spacing={2} flexWrap="wrap" sx={{ width: "100%", mt: 2 }}>
            {films.map((x) => (
              <Chip
                sx={{ fontWeight: "bold" }}
                key={`filter-film-${x.id}`}
                label={x.title}
                color={filmsFilter[x.id] ? "success" : undefined}
                onClick={() => dispatch(toggleFilm(x.id))}
                aria-label="Film title"
              />
            ))}
          </Stack>
        </FormControl>
        <Stack direction="row" alignItems="center">
          <PersonSearchIcon />
          <Typography variant="h5" component="h5" marginLeft={1}>
            Appearance
          </Typography>
        </Stack>
        <FormControl fullWidth>
          <InputLabel id="selectGender">Gender</InputLabel>
          <Select
            name="selectedGender"
            labelId="selectGender"
            value={directFilters.selectedGender}
            label="Gender"
            onChange={handleChangeDirectFilter}
          >
            <MenuItem value="">-- Remove filter --</MenuItem>
            {directFilters.genders.map((x) => (
              <MenuItem key={`gender-item-${x}`} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="selectedEyeColor">Eye Color</InputLabel>
          <Select
            name="selectedEyeColor"
            labelId="selectedEyeColor"
            id="selectedEyeColor"
            value={directFilters.selectedEyeColor}
            label="Eye Color"
            onChange={handleChangeDirectFilter}
          >
            <MenuItem value="">-- Remove filter --</MenuItem>
            {directFilters.eyeColors.map((x) => (
              <MenuItem key={`eye-item-${x}`} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="selectedHairColor">Hair Color</InputLabel>
          <Select
            name="selectedHairColor"
            labelId="selectedHairColor"
            id="selectedHairColor"
            value={directFilters.selectedHairColor}
            label="Hair Color"
            onChange={handleChangeDirectFilter}
          >
            <MenuItem value="">-- Remove filter --</MenuItem>
            {directFilters.hairColors.map((x) => (
              <MenuItem key={`hair-item-${x}`} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
