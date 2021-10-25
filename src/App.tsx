import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

import Header from "./components/Header/Header";
import FilterDrawer from "./components/FilterDrawer/FilterDrawer";
import NavTabs from "./components/NavTabs/NavTabs";
import LinkTab from "./components/LinkTab/LinkTab";
import Loading from "./components/Loading/Loading";

import { useCharactersQuery, useFilmsQuery } from "./app/api/generated";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import {
  loadFavorites,
  selectCharacters,
  selectFavoriteCharacters,
} from "./features/characters/charactersSlice";
import {
  loadFilms,
  loadDirectFilters,
  selectHasFilters,
  clearFilters,
} from "./features/filters/filtersSlice";
import Filters from "./features/filters/Filters";

import routes from "./routes";

function App() {
  const [filterSelected, setFilterSelected] = useState(false);
  const { data: characters, isLoading: isCharactersLoading } =
    useCharactersQuery();
  const { data: films, isLoading: isFilmsLoading } = useFilmsQuery();
  const hasFilters = useAppSelector(selectHasFilters);
  const allCharacters = useAppSelector(selectCharacters);
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const selectedTab = routes.findIndex((x) => x.path === location.pathname);
  const countMap: {
    [key in string]: number;
  } = {
    "/": allCharacters.length,
    "/favorites": favoriteCharacters.length,
  };

  const handleChangeTab = (href: string) => {
    history.push(href);
  };

  const handleClearFilter = () => {
    window.scrollTo({
      top: 0,
    });
    dispatch(clearFilters());
  };

  useEffect(() => {
    if (characters) {
      dispatch(loadFavorites());
      dispatch(loadDirectFilters());
    }
  }, [characters, dispatch]);

  useEffect(() => {
    if (films) {
      dispatch(loadFilms());
    }
  }, [films, dispatch]);

  return (
    <>
      <CssBaseline />
      <Header
        filterSelected={filterSelected}
        onToggleFilter={setFilterSelected}
        hasFilters={hasFilters}
        onClearFilters={handleClearFilter}
      />
      <Container sx={{ mt: 2, mb: 4 }}>
        <FilterDrawer
          open={filterSelected}
          onClose={() => setFilterSelected(false)}
        >
          <Loading isLoading={isFilmsLoading}>
            <Filters />
          </Loading>
        </FilterDrawer>
        <Loading isLoading={isCharactersLoading}>
          <Box mb={4}>
            <NavTabs value={selectedTab === -1 ? 0 : selectedTab}>
              {routes.map((x) => (
                <LinkTab
                  key={`link-${x.path}`}
                  label={`${x.linkLabel} (${countMap[x.path]})`}
                  href={x.path}
                  onLinkSelect={handleChangeTab}
                />
              ))}
            </NavTabs>
          </Box>
          <Switch>
            {routes.map((x) => (
              <Route key={`route-${x.path}`} exact={x.exact} path={x.path}>
                <section aria-label={x.contentLabel}>{x.component}</section>
              </Route>
            ))}
          </Switch>
        </Loading>
      </Container>
    </>
  );
}

export default App;
