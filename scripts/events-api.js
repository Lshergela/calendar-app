export const createEvent = async (event) => {
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
    const response = await axios.post(
      'https://dentini-calendar-3ac858824eb1.herokuapp.com/api/events/',
      body,
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
      'https://dentini-calendar-3ac858824eb1.herokuapp.com/api/events/',
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
    await axios.delete(
      `https://dentini-calendar-3ac858824eb1.herokuapp.com/api/events/${eventId}/`,
      config
    );
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
      `https://dentini-calendar-3ac858824eb1.herokuapp.com/api/events/${event.id}`,
      body,
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);

    return error;
  }
};
