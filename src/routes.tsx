import { Box } from "@mui/system";

import Characters from "./features/characters/Characters";
import DownloadFavorites from "./features/characters/DownloadFavorites";

interface RouteConfig {
  component: React.ReactNode;
  path: string;
  exact: boolean;
  linkLabel: string;
  contentLabel: string;
}

const routes: RouteConfig[] = [
  {
    component: <Characters filterFavorite={false} />,
    path: "/",
    exact: true,
    linkLabel: "All",
    contentLabel: "All characters",
  },
  {
    component: (
      <>
        <Characters filterFavorite />
        <Box sx={{ position: "fixed" }} bottom={16} right={12}>
          <DownloadFavorites />
        </Box>
      </>
    ),
    path: "/favorites",
    exact: false,
    linkLabel: "Favorites",
    contentLabel: "Favorite characters",
  },
];

export default routes;
