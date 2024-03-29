/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import { CircularProgress, Container, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { DefaultTheme } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux';
import { DiscogsState, fetchDiscogsInventory } from '../redux/modules/inventory';
import AlbumInstanceModal from './AlbumInstanceModal';

export interface Album {
  title: string;
  artist: string;
  year: number;
  addedOn: string;
  link: string;
  coverImage: string;
  thumb: string;
}

interface DispatchProps {
  fetchDiscogsInventory: () => void;
}

export interface HeaderProps {
  inventory: DiscogsState;
}

type Props = DispatchProps & HeaderProps;

export const Inventory: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

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
      thumb: release.thumb,
    };

    albums.push(album);
  }

  const onAlbumInstanceModalClose = () => {
    setIsOpen(false);
    setSelectedAlbum(null);
  };

  const onAlbumThumbClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsOpen(true);
  };

  const isSmallerThanSmBreakpoint = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('sm'));

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
        <Container>
          <ImageList cols={isSmallerThanSmBreakpoint ? 3 : 8}>
            {albums.map((album, index) => (
              <ImageListItem
                key={`${album.title}-${album.addedOn}`}
                onClick={() => onAlbumThumbClick(album)}
              >
                <img src={album.coverImage} srcSet={`${album.coverImage}`} alt={album.title} loading="lazy" />
                <ImageListItemBar title={album.title} subtitle={album.artist} />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
        {selectedAlbum !== null && <AlbumInstanceModal album={selectedAlbum} isVisible={isOpen} handleClose={onAlbumInstanceModalClose} />}
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
