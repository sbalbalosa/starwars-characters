import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  Fade,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  ToggleButton,
} from "@mui/material";
import LazyLoad from "react-lazyload";

interface Props {
  name: string;
  isFavorite: boolean;
  imgSrc: string;
  onToggleFavorite: (favorite: boolean) => void;
}

export default function CharacterCard({
  isFavorite,
  onToggleFavorite,
  name,
  imgSrc,
}: Props) {
  return (
    <Fade appear in>
      <Card sx={{ width: 250 }} aria-label="Character card">
        <LazyLoad height={300}>
          <CardMedia
            component="img"
            image={imgSrc}
            alt="character"
            height={300}
          />
        </LazyLoad>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              gutterBottom
              variant="body1"
              component="h5"
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
            <ToggleButton
              color="primary"
              size="small"
              value="check"
              selected={isFavorite}
              aria-label="Is favorite"
              onChange={() => onToggleFavorite(!isFavorite)}
            >
              <StarOutlinedIcon />
            </ToggleButton>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );
}
