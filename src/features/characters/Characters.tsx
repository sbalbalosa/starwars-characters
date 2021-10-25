import { Grid, Typography } from "@mui/material";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  toggleFavorite,
  selectFavorites,
  selectCharacters,
  selectFavoriteCharacters,
  selectAllCharacterIndex,
} from "./charactersSlice";

interface Props {
  filterFavorite: boolean;
}

export default function Characters({ filterFavorite }: Props) {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const allCharacters = useAppSelector(selectCharacters);
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters);
  const characterIndex = useAppSelector(selectAllCharacterIndex);

  const characters = filterFavorite ? favoriteCharacters : allCharacters;

  return (
    <Grid container spacing={2} justifyContent="center">
      {characters.length === 0 && (
        <Grid item>
          <Typography variant="h4" component="h1">
            {filterFavorite
              ? "No favorites found"
              : "Welcome to the dark side, no records found."}
          </Typography>
        </Grid>
      )}
      {characters.map((x) => (
        <Grid item key={x.id}>
          <CharacterCard
            isFavorite={favorites[x.id]}
            name={x.name}
            imgSrc={`https://starwars-visualguide.com/assets/img/characters/${
              characterIndex[x.id]
            }.jpg`}
            onToggleFavorite={() => {
              dispatch(toggleFavorite(x.id));
            }}
            aria-label="Character card"
          />
        </Grid>
      ))}
    </Grid>
  );
}
