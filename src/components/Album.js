import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: '0:00',
      duration: this.formatTime(album.songs[0].duration),
      currentVolume: 50,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.formatTime(this.audioElement.currentTime) });
      },
      durationchange: e => {
        this.setState({ duration: this.formatTime(this.audioElement.duration) });
      },
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex+1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: this.formatTime(newTime) });
  }

  handleVolumeChange(e) {
    const newVol = e.target.value;
    this.audioElement.volume = newVol/100;
    this.setState({ currentVolume: newVol });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '-:--';
    else {
      const intSec = Math.round(seconds);
      const min = Math.round(intSec/60);
      const sec = intSec%60;
      if (sec>=10)
      return `${min}:${sec}`;
      else
      return `${min}:0${sec}`;
    }
  }

  whichIcon(song, index){
    if (this.state.currentSong !== song)
    return (
      <td className='songNumCell'>
        <span className='trackNumber'>{index+1}</span><span className='ion-play'></span>
      </td>
    )
    else if (this.state.isPlaying)
    return (
      <td className='songNumCell'><span className='ion-pause'></span></td>)
        else
        return (<td className='songNumCell'><span className='ion-play' id='just-play'></span></td>)
      }

      render() {
        return (
          <section className="album">
            <section id="album-info">
              <img id="album-cover-art"  src={this.state.album.albumCover}/>
              <div className="album-details">
                <h1 id="album-title">{this.state.album.title}</h1>
                <h2 className="artist">{this.state.album.artist}</h2>
                <div id="release-info">{this.state.album.releaseInfo}</div>
              </div>
            </section>
            <table id="song-list">
              <colgroup>
                <col id="song-number-column"/>
                <col id="song-title-column"/>
                <col id="song-duration-column"/>
              </colgroup>
              <tbody>

                { this.state.album.songs.map( (song, index) =>
                  <tr className='songRow' key={index} onClick={() => this.handleSongClick(song)}  >
                    {  this.whichIcon(song, index) }
                    <td className='songTitleCell'>{this.state.album.songs[index].title}</td>
                    <td className='songDurationCell'>{this.formatTime(this.state.album.songs[index].duration)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PlayerBar
              isPlaying={this.state.isPlaying}
              currentSong={this.state.currentSong}
              currentTime={this.state.currentTime}
              duration={this.state.duration}
              timeSliderPos={this.audioElement.currentTime/this.audioElement.duration}
              currentVolume={this.state.currentVolume}
              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
              />
          </section>
        );
      }
    }

    export default Album;
