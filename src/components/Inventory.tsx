/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import { CircularProgress, Container } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux';
import { DiscogsState, fetchDiscogsInventory } from '../redux/modules/inventory';

export interface Album {
  title: string;
  artist: string;
  year: number;
  addedOn: string;
  link: string;
  coverImage: string;
}

interface DispatchProps {
  fetchDiscogsInventory: () => void;
}

export interface HeaderProps {
  inventory: DiscogsState;
}

type Props = DispatchProps & HeaderProps;

export const Inventory: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.inventory.isLoading && props.inventory.data.length === 0) {
      props.fetchDiscogsInventory();
    }
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
      <Container>
        <ImageList>
          {albums.map((album, index) => (
            <ImageListItem key={`${album.title}-${album.addedOn}`} style={{ height: '20vh', width: '20vh', objectFit: 'scale-down' }}>
              <img src={album.coverImage} srcSet={`${album.coverImage}`} alt={album.title} loading="lazy" />
              <ImageListItemBar title={album.title} subtitle={album.artist} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
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
