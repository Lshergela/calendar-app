export const createEvent = async (event) => {
  const access_token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.post(
      'http://localhost:3000/api/events/',
      event,
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);

    return error;
  }
};

export const getEvents = async () => {
  const access_token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(
      'http://localhost:3000/api/events/',
      config
    );

    localStorage.setItem('events', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteEvent = async (eventId) => {
  const access_token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    await axios.delete(`http://localhost:3000/api/events/${eventId}/`, config);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateEvent = async (event) => {
  const access_token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  const body = {
    title: event.title,
    startTime: event.startTime,
    endTime: event.endTime,
    date: event.date,
    color: event.color,
  };

  try {
    const response = await axios.patch(
      `http://localhost:3000/api/events/${event.id}`,
      body,
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);

    return error;
  }
};
