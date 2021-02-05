export function fetchShipments() {
  return () => {
    return fetch('./shipments.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      });
  };
}