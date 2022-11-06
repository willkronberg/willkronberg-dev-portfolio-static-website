/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Container } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
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
      artist: release.artists[0].name,
      title: release.title,
      year: release.year,
      addedOn: release.date_added,
      link: release.url,
      coverImage: release.cover_image,
    };

    albums.push(album);
  }

  let element = (
    <>
      <Container style={{ minHeight: '420px' }}>
        <div
          style={{
            display: 'table',
            position: 'absolute',
            top: '-15%',
            left: 0,
            height: '100%',
            width: '100%',
          }}
        >
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <div style={{ marginLeft: '50%', marginRight: '50%' }}>
              <CircularProgress />
            </div>
          </div>
        </div>
      </Container>
    </>
  );

  if (!props.inventory.isLoading) {
    element = (
      <>
        <Grid container spacing={4}>
          {albums.map((album, index) => (
            <Album key={`${album.title}-${index}`} album={album} />
          ))}
        </Grid>
      </>
    );
  }

  return element;
};

const mapStateToProps = (state: RootState) => ({
  inventory: state.inventory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDiscogsInventory: () => dispatch<any>(fetchDiscogsInventory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
