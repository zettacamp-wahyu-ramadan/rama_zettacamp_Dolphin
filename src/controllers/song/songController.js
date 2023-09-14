const httpStatus = require('http-status');
const { listSong } = require('../../constants/listSongConstant');

const groupByArtistController = async (req, res) => {
  // console.log('USER', req.user)
  try {
    const uniqueArtist = listSong
      .map((valueMap) => valueMap.artist)
      .filter(
        (valueFilter, indexFilter, arrayFilter) =>
          arrayFilter.indexOf(valueFilter) === indexFilter
      );
    // Find list song by artist
    const mapingArtist = uniqueArtist.map((valueArtist, indexArtist) => {
      const groupingArtist = listSong.filter(
        (valueSong) => valueSong.artist === valueArtist
      );
      return {
        artist: valueArtist,
        // songs: JSON.stringify(groupingArtist, null, 2),
        songs: groupingArtist,
      };
    });

    // return mapingArtist;
    res.sendWrapped('Song group by artist', httpStatus.OK, mapingArtist);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const groupByGenreController = async (req, res) => {
  try {
    const uniqueGenre = listSong
      .map((valueMap) => valueMap.genre)
      .filter(
        (valueFilter, indexFilter, arrayFilter) =>
          arrayFilter.indexOf(valueFilter) === indexFilter
      );
    // Find list song by genre
    const mapingGenre = uniqueGenre.map((valueGenre, indexGenre) => {
      const groupingGenre = listSong.filter(
        (valueSong) => valueSong.genre === valueGenre
      );
      return {
        genre: valueGenre,
        // songs: JSON.stringify(groupingGenre, null, 2),
        songs: groupingGenre,
      };
    });

    // return mapingGenre;
    res.sendWrapped('Song group by genre', httpStatus.OK, mapingGenre);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const randomListSongsController = async (req, res) => {
  try {
    let initialDurationSecond = 0;
    const maxLength = 60 * 60;
    let finalDuration = 0;
    let randomKeyId = [];

    // Looping for initial random key
    listSong.forEach((valueSong) => {
      // Set random data by id
      const random = listSong[Math.floor(Math.random() * listSong.length)];
      // If have't data in array randomKeyId, then push it for initialization
      if (!randomKeyId.length) {
        randomKeyId.push(random);
      } else {
        // Check is array from variable randomKeyId already have same data
        const containObject = randomKeyId.some((valueSome) => {
          return valueSome.id === random.id;
        });

        // If contain same data, push it to false, if not push the data
        if (containObject) {
          randomKeyId.push(false);
        } else {
          randomKeyId.push(random);
        }
      }
    });

    // Find filter when the value in random key is not false
    const filteringTheRandomId = randomKeyId.filter(
      (valueFilter) => valueFilter
    );

    // Looping for remaining data
    listSong.forEach((valueAnotherSong) => {
      // Check the duplicate data from randomKeyId with original array
      const isDuplicate = randomKeyId.some((valueSome) => {
        return valueSome.id === valueAnotherSong.id;
      });

      // If not duplicate, push the data, if duplicate push false
      if (!isDuplicate) {
        randomKeyId.push(valueAnotherSong);
      } else {
        randomKeyId.push(false);
      }
    });

    // Filtering value in randomKeyId where is not false
    const finalResultArray = randomKeyId.filter((valueFilter) => valueFilter);

    // Get the duration all list song
    const filterSong = finalResultArray.filter((valueDuration, index) => {
      // Set data duration from looping in variable duration
      const duration = valueDuration.duration;
      // Get the minute
      const minuteOfSong = parseInt(duration.split('.')[0]);
      // Get the second
      const secondOfSong = parseInt(duration.split('.')[1]);
      // Convert the minute to second
      const convertMinutesToSecond = minuteOfSong * 60;
      // Calculate duration with unit of seconds
      const totalDurationSecondPerSong = convertMinutesToSecond + secondOfSong;
      // Set the initial variable for duration to result from calculate second
      initialDurationSecond += totalDurationSecondPerSong;

      // If duration less or equal than 1 hour, return the value, otherwise return false
      if (initialDurationSecond <= maxLength) {
        finalDuration = initialDurationSecond;
        return valueDuration;
      }

      return false;
    });

    // Add the total duration from that calculating
    filterSong.push({ totalDuration: finalDuration, max: maxLength });
    // return filterSong;
    res.sendWrapped('Random list of songs', httpStatus.OK, filterSong);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  groupByArtistController,
  groupByGenreController,
  randomListSongsController,
};
