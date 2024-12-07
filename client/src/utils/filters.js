export function filterPlaces(places, query) {
    return places.filter(function (place) {
      return (
        place.title.toLowerCase().includes(query.toLowerCase()) ||
        place.description.toLowerCase().includes(query.toLowerCase()) ||
        place.tags.some(function (tag) {
          return tag.toLowerCase().includes(query.toLowerCase());
        })
      );
    });
  }
  