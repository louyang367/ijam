import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
      <section className="player-bar">
      <section id="buttons">
        <button id="previous" onClick={this.props.handlePrevClick}>
          <span className="ion-skip-backward"></span>
        </button>
        <button id="play-pause" onClick={this.props.handleSongClick}>
          <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
        </button>
        <button id="next" onClick={this.props.handleNextClick}>
          <span className="ion-skip-forward"></span>
        </button>
        <div className="current-bar-val">&quot;{this.props.currentSong.title}&quot;</div>
      </section>
      <section id="time-control">
        <span className="current-time">0</span>
        <input
          type="range"
          className="seek-bar"
          value={this.props.timeSliderPos || 0}
          max="1"
          min="0"
          step="0.01"
          onChange={this.props.handleTimeChange}
        />
        <span className="total-time">{this.props.duration}</span>
        <div className="current-bar-val">{this.props.currentTime}</div>
      </section>
      <section id="volume-control">
        <span className="icon ion-volume-low">0</span>
        <input
          type="range"
          className="volume-bar"
          value={(this.props.currentVolume) || 50}
          max="100"
          min="0"
          step="1"
          onChange={this.props.handleVolumeChange}
        />
        <span className="icon ion-volume-high">100</span>
        <div className="current-bar-val">{this.props.currentVolume}</div>
      </section>
    </section>
    );
   }
 }

 export default PlayerBar;
