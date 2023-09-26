const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    songs: [
      {
        song_id: {
          type: mongoose.Types.ObjectId,
          ref: 'Song',
        },
      },
    ],
    is_run: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Playlist', playlistSchema);
