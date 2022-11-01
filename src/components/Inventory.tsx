/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FeaturedPost, { Post } from './FeaturedPost';
import { DiscogsState, fetchDiscogsInventory } from '../redux/modules/inventory';
import { RootState } from '../redux';
import Album from './Album';

interface DispatchProps {
  fetchDiscogsInventory: () => void;
}

export interface HeaderProps {
  inventory: DiscogsState;
}

type Props = DispatchProps & HeaderProps;

export const Inventory: React.FC<Props> = (props) => {
  useEffect(() => {
    props.fetchDiscogsInventory();
  }, []);
  const albums: Album[] = [];
  for (const release of props.inventory.data) {
    const album: Album = {
      artist: release.basic_information.artists[0].name,
      title: release.basic_information.title,
      year: release.basic_information.year,
    };

    albums.push(album);
  }

  return (
    <>
      <Grid container spacing={4}>
        {albums.map((album, index) => (
          <Album key={`${album.title}-${index}`} album={album} />
        ))}
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  inventory: state.inventory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDiscogsInventory: () => dispatch<any>(fetchDiscogsInventory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
