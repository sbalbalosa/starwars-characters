import { useRef } from "react";
import { Fab, Grow } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";

import { useAppSelector } from "../../app/hooks";
import { selectFlatFavoriteCharacters } from "./charactersSlice";

export default function DownloadFavorites() {
  const favoriteCharacters = useAppSelector(selectFlatFavoriteCharacters);
  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  const handleDownload = () => {
    csvLinkRef?.current?.link.click();
  };

  return (
    <>
      <CSVLink
        data={favoriteCharacters}
        filename="star-wars-favorites.csv"
        ref={csvLinkRef}
      />
      <Grow appear in>
        <Fab
          color="primary"
          size="medium"
          aria-label="Download CSV"
          onClick={handleDownload}
        >
          <FileDownloadIcon />
        </Fab>
      </Grow>
    </>
  );
}
